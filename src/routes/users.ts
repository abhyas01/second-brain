import { express, z, bcrypt, jwt, JWT_SECRET, JWT_EXPIRY } from '../configs/config';
import { UserModel } from '../db-store/db';

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

userRouter.post('/signin', async (req: express.Request, res: express.Response): Promise<void> => {

});

userRouter.post('/content', async (req: express.Request, res: express.Response): Promise<void> => {

});

userRouter.get('/content', async (req: express.Request, res: express.Response): Promise<void> => {

});

userRouter.delete('/content', async (req: express.Request, res: express.Response): Promise<void> => {

});

userRouter.post('/brain/share', async (req: express.Request, res: express.Response): Promise<void> => {

});

export default userRouter;