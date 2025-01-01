import { express, bodyParser, mongoose, MONGO_URL, PORT } from './configs/config';
import userRouter from './routes/users';
import publicRouter from './routes/public';
import rateLimit from 'express-rate-limit';

const app: express.Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(bodyParser.json() as express.RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as express.RequestHandler);

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/public/', publicRouter);

(async function(){
  try{
    await mongoose.connect(MONGO_URL as string);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch(err){
    console.error('App could not start\n', err);
  }
})();