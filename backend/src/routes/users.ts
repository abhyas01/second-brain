import { express, z, bcrypt, jwt, JWT_SECRET, JWT_EXPIRY } from '../configs/config';
import usersMiddleware from '../middlewares/users/usersMiddleware';
import { UserModel, ContentModel, TagsModel } from '../db-store/db';

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

userRouter.post('/tags', usersMiddleware, async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({
      title: z.string().min(1, {
        message: 'Tag Name must be of at least 1 character'
      }).max(10, {
        message: 'Tag Name must be of at most 10 characters'
      })
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(411).json({ msg: parsedWithSuccess.error.errors.map(err => err.message) });
    // const body: z.infer<typeof schema> = req.body;
    const tagTitle = req.body.title;
    const tagExists = await TagsModel.findOne({
      title: tagTitle
    });
    if (tagExists) return res.status(403).json({ msg: 'Tag already exists, illegal request' });
    const tagCreated = await TagsModel.create({
      title: tagTitle
    });
    const tagCreatedObject = tagCreated.toObject() as Record<string, any>;
    delete tagCreatedObject.__v;
    res.status(200).json({
      tagCreated: true,
      tagContent: tagCreatedObject
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.get('/tags', usersMiddleware, async (req: express.Request, res: express.Response): Promise<void> => {
  try{
    const tags = await TagsModel.find({}).select('title _id');
    res.status(200).json({
      tags: tags
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.post('/content', usersMiddleware, async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const schema: z.AnyZodObject = z.object({
      type: z.enum(['Document', 'Tweet', 'YouTube', 'Link', 'Social'], {
        message: 'type can only be: Document/Tweet/YouTube/Link/Social'
      }),
      link: z.string().url({
        message: 'Please provide a valid URL starting with http:// or https://'
      }),
      title: z.string().min(3, {
        message: 'Title should be of at least 3 characters'
      }).max(30, {
        message: 'Title should be of at most 30 characters'
      }),
      tags: z.array(z.string().length(24, {
        message: 'Invalid tags'
      }).regex(/^[a-fA-F0-9]+$/, {
        message: 'Invalid tags'
      }))
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(411).json({ msg: parsedWithSuccess.error.errors.map(err => err.message) });
    // const body: z.infer<typeof schema> = req.body;
    let validTags;
    try{
      validTags = await TagsModel.find({
        _id: { $in: req.body.tags }
      });
    } catch(err){
      return res.status(411).json({ msg: 'Invalid tags' });
    }
    if (validTags.length !== req.body.tags.length){
      return res.status(411).json({ msg: 'Invalid tags' });
    }
    const content = await ContentModel.create({
      type: req.body.type,
      link: req.body.link,
      title: req.body.title,
      tags: req.body.tags,
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

userRouter.get('/content', usersMiddleware, async (req: express.Request, res: express.Response): Promise<void> => {
  try{
      const contents = await ContentModel.find({
        userId: req.id
      }, '-__v').populate({
        path: 'userId',
        select: 'username -_id'
      })
      .populate({
        path: 'tags',
        select: 'title _id'
      });
    res.status(200).json({
      contents
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

userRouter.delete('/content', usersMiddleware, async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const schema: z.AnyZodObject = z.object({
      contentId: z.string().length(24).regex(/^[a-fA-F0-9]+$/)
    }).strict();
    const parsedWithSuccess = schema.safeParse(req.body);
    if (!parsedWithSuccess.success) return res.status(403).json({ msg: 'Invalid ID' });
    // const body: z.infer<typeof schema> = req.body;
    const content = await ContentModel.findOne({
      _id: req.body.contentId,
      userId: req.id
    });
    if (!content) return res.status(403).json({ msg: 'Invalid ID' });
    await ContentModel.deleteOne({ _id: req.body.contentId, userId: req.id });
    res.status(200).json({ msg: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server is facing some error' });
  }
});

userRouter.post('/brain/share', async (req: express.Request, res: express.Response): Promise<void> => {

});

export default userRouter;