import { express } from "../configs/config";
import { ContentModel, LinkModel, UserModel } from "../db-store/db";

const publicRouter: express.Router = express.Router();

publicRouter.get('/brain/:shareLink', async (req: express.Request, res: express.Response): Promise<any> => {
  try{
    const hash = req.params.shareLink ?? "";
    if(!hash){
      return res.status(404).json({ msg: "Page not found" });
    }
    const response = await LinkModel.findOne({
      hash: hash
    }, '-_id -__v');
    if (!response) return res.status(404).json({ msg: "Page not found" });
    const contentResponse = await ContentModel.find({
      userId: response.userId
    }, '-userId -__v').populate({
      path: 'tags',
      select: '_id title'
    });
    const userResponse = await UserModel.findOne({
      _id: response.userId
    }, '-_id, -password -__v');
    if (!userResponse){
      return res.status(500).json({ msg: "Some error has occured." });
    }
    res.status(200).json({
      username: userResponse.username,
      content: contentResponse
    });
  } catch(err){
    res.status(500).json({
      msg: 'Server is facing some error'
    });
  }
});

export default publicRouter; 