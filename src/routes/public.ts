import { express } from "../configs/config";

const publicRouter: express.Router = express.Router();

publicRouter.get('/brain/:shareLink', async (req: express.Request, res: express.Response): Promise<void> => {
  
});

export default publicRouter;