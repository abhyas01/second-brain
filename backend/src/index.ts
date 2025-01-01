import { express, bodyParser, mongoose, MONGO_URL, PORT } from './configs/config';
import { limiter } from './limiters/requestLimiter';
import userRouter from './routes/users';
import publicRouter from './routes/public';

const app: express.Application = express();

app.use(limiter as express.RequestHandler);

app.use(bodyParser.json() as express.RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as express.RequestHandler);

app.use('/api/v1/users/', userRouter as express.RequestHandler);
app.use('/api/v1/public/', publicRouter as express.RequestHandler);

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