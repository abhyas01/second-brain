import { express, bodyParser, mongoose, MONGO_URL, PORT, path } from './configs/config';
import { limiter, publicLimiter } from './limiters/requestLimiter';
import userRouter from './routes/users';
import publicRouter from './routes/public';

const app: express.Application = express();

app.use(bodyParser.json() as express.RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as express.RequestHandler);

app.use('/api/v1/public/', publicLimiter);
app.use('/api/v1/users/', limiter);

app.use('/static', publicLimiter, express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users/', userRouter as express.RequestHandler);
app.use('/api/v1/public/', publicRouter as express.RequestHandler);

app.use(publicLimiter, (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(404).json({ msg: 'Page Not Found' });
});

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