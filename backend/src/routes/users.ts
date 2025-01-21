import { UserModel, ContentModel, LinkModel } from '../db-store/db';
import { express, z, bcrypt, jwt, JWT_SECRET, JWT_EXPIRY } from '../configs/config';
import { generateGloballyUniqueString } from '../utils/helperFuncs';
import { revokeToken } from '../utils/revokeLogic';
import usersMiddleware from '../middlewares/users/usersMiddleware';

const userRouter: express.Router = express.Router();

userRouter.post('/signup', async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({
      username: z.string().min(3, {
        message: 'Username must have at least 3 characters'
      }).max(10, {
        message: 'Username must have at most 10 characters'
      }),
      password: z.string().min(8, {
        message: 'Password must have at least 8 characters'
      }).max(20, {
        message: 'Password must have at most 20 characters.'
      }).refine((value: string): boolean => {
        const valArr: string[] = [...value];
        const isUpperCase: boolean = valArr.some((char: string): boolean => {
          return char >= 'A' && char <= 'Z';
        });
        const isLowerCase: boolean = valArr.some((char: string): boolean => {
          return char >= 'a' && char <= 'z';
        });
        const isSplChar: boolean = valArr.some((char: string): boolean => {
          return '!@#$%^&*()'.includes(char);
        });
        const isNumber: boolean = valArr.some((char: string): boolean => {
          return char.trim() !== '' && !isNaN(Number(char));
        })
        return isUpperCase && isLowerCase && isSplChar && isNumber;
      }, {
        message: 'Password should have atleast one uppercase, one lowercase, one special character, one number'
      })
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(411).json({ msg: parsedWithSuccess.error.errors.map(err => err.message) });
    // const body: z.infer<typeof schema> = req.body;
    const findDuplicate = await UserModel.findOne({
      username: req.body.username
    });
    if (findDuplicate) return res.status(403).json({ msg: 'This username already exists' });
    const encryptedPass: string = await bcrypt.hash(req.body.password, 10);
    const userEntry = await UserModel.create({
      username: req.body.username,
      password: encryptedPass
    });
    const token: string = jwt.sign({
      id: userEntry._id
    }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRY
    });
    res.status(200).json({
      token: token
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.post('/signin', async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({
      username: z.string().min(3).max(10),
      password: z.string().min(8).max(20)
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(403).json({ msg: 'Incorrect credentials' });
    // const body: z.infer<typeof schema> = req.body;
    const findUser = await UserModel.findOne({
      username: req.body.username
    });
    if (!findUser) return res.status(403).json({ msg: 'Incorrect credentials' });
    const isPassCorrect: boolean = await bcrypt.compare(req.body.password, findUser.password);
    if (!isPassCorrect) return res.status(403).json({ msg: 'Incorrect credentials' });
    const token: string = jwt.sign({
      id: findUser._id
    }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRY
    });
    res.status(200).json({
      token: token
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.post('/content', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({
      type: z.enum(['Other', 'Tweet', 'YouTube'], {
        message: 'Type can only be: Tweet/YouTube/Other'
      }),
      link: z.string().url({
        message: 'Please provide a valid URL starting with http:// or https://'
      }),
      title: z.string().min(3, {
        message: 'Title should be of at least 3 characters'
      }).max(200, {
        message: 'Title should be of at most 200 characters'
      })
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(411).json({ msg: parsedWithSuccess.error.errors.map(err => err.message) });
    
    const link = req.body.link;
    const type = req.body.type;
    let videoId: string | null = null;
    let tweetUsername: string | null = null;
    let tweetStatusId: string | null = null;

    if(type === "YouTube"){
      const videoIdMatch = link.match(/v=([^&]+)/) || link.match(/\/embed\/([^/?]+)/);
      videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (!videoId && !link.includes('youtube.com')) return res.status(411).json({ msg: "Not a YouTube link, try with Other type?" });
    } else if(type === "Tweet") {
      const tweetMatch = link.replace("x.com", "twitter.com").match(/twitter\.com\/([^\/]+)\/status\/(\d+)/);
      if (tweetMatch) {
        tweetUsername = tweetMatch[1];
        tweetStatusId = tweetMatch[2];
      }
      if (!tweetUsername || !tweetStatusId) {
        return res.status(411).json({ msg: "Not a valid Twitter link, try with Other type?" });
      }
    }
    // const body: z.infer<typeof schema> = req.body;
    const content = await ContentModel.create({
      type: type,
      link: type === "YouTube" ? videoId : type === "Tweet" ? `${tweetUsername}/${tweetStatusId}` : link,
      title: req.body.title,
      userId: req.id
    });
    const contentObject = content.toObject() as Record<string, any>;
    delete contentObject.userId;
    delete contentObject.__v;
    res.status(200).json({
      contentCreated: true,
      content: contentObject
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.get('/content/all', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const contents = await ContentModel.find(
      { userId: req.id },
      '-__v'
    )
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .lean();
    const transformedContents = contents.map((content: any) => {
      const { userId, ...rest } = content;
      return { ...rest, user: userId };
    });
    res.status(200).json({
      contents: transformedContents,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Server is facing some error',
    });
  }
});

userRouter.get('/content/tweet', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const contents = await ContentModel.find(
      { userId: req.id,
        type: 'Tweet'
      },
      '-__v'
    )
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .lean();
    const transformedContents = contents.map((content: any) => {
      const { userId, ...rest } = content;
      return { ...rest, user: userId };
    });
    res.status(200).json({
      contents: transformedContents,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Server is facing some error',
    });
  }
});

userRouter.get('/content/youtube', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const contents = await ContentModel.find(
      { userId: req.id,
        type: 'YouTube'
      },
      '-__v'
    )
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .lean();
    const transformedContents = contents.map((content: any) => {
      const { userId, ...rest } = content;
      return { ...rest, user: userId };
    });
    res.status(200).json({
      contents: transformedContents,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Server is facing some error',
    });
  }
});

userRouter.get('/content/other', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const contents = await ContentModel.find(
      { userId: req.id,
        type: 'Other'
      },
      '-__v'
    )
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .lean();
    const transformedContents = contents.map((content: any) => {
      const { userId, ...rest } = content;
      return { ...rest, user: userId };
    });
    res.status(200).json({
      contents: transformedContents,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Server is facing some error',
    });
  }
});

userRouter.delete('/content', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const schema: z.AnyZodObject = z.object({
      contentId: z.string().length(24).regex(/^[a-fA-F0-9]+$/)
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(403).json({ msg: 'Invalid ID' });
    // const body: z.infer<typeof schema> = req.body;
    let content;
    try{
      content = await ContentModel.findOne({
        _id: req.body.contentId,
        userId: req.id
      });
    } catch(err){
      return res.status(403).json({ msg: 'Invalid ID' });
    }
    if (!content) return res.status(403).json({ msg: 'Invalid ID' });
    await ContentModel.deleteOne({ _id: req.body.contentId, userId: req.id });
    res.status(200).json({ msg: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server is facing some error' });
  }
});

userRouter.post('/brain/share', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const schema: z.AnyZodObject = z.object({
      share: z.boolean(),
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) {
      return res.status(411).json({ msg: "Invalid request" });
    }
    // const body: z.infer<typeof schema> = req.body;
    if (req.body.share) {
      const findDuplicate = await LinkModel.findOne({ userId: req.id }, 'hash -_id');
      if (findDuplicate) {
        return res.status(204).json({ msg: 'Link sharing already enabled', hash: findDuplicate.hash });
      } else {
        const uniqueHash: string = generateGloballyUniqueString();
        await LinkModel.create({
          userId: req.id,
          hash: uniqueHash,
        });
        return res.status(200).json({ msg: 'Link sharing enabled', hash: uniqueHash });
      }
    } else {
      await LinkModel.deleteOne({ userId: req.id });
      return res.status(200).json({ msg: 'Link sharing disabled' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server is facing some error' });
  }
});

userRouter.post('/logout', usersMiddleware as express.RequestHandler, async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({}).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success){
      return res.status(403).json({ msg: 'Illegal request' });
    }
    const response: Boolean = await revokeToken(req.token as string, req.id as string);
    if (response){
      return res.status(200).json({ msg: 'Logged out' });
    } else{
      return res.status(500).json({
        msg: 'Server error, could not log you out'
      });
    }
  } catch(err){
    res.status(500).json({ msg: 'Server is facing some error' });
  }
});

export default userRouter;