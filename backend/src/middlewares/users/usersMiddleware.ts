import { express, jwt, JWT_SECRET } from '../../configs/config';
import { isTokenRevoked } from "../../utils/revokeLogic";

function usersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void {
  try{
    const token = req.headers?.['x-auth-key'];
    if (!token || typeof(token) !== 'string'){
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    jwt.verify(<string>token, <string>JWT_SECRET, async (err, decoded): Promise<express.Response | void> => {
      if(!err){
        const userId: string = (decoded as jwt.JwtPayload).id as string;
        const response: Boolean = await isTokenRevoked(token, userId);
        if(response) return res.status(401).json({ msg: 'Unauthorized' });
        req.token = token;
        req.id = userId;
        next();
      } else{
        res.status(401).json({ msg: 'Unauthorized' });
      }
    });
  } catch (err){
    res.status(501).json({ msg: 'Cannot Authenticate. Server is facing some Error.' });
  }
}

export default usersMiddleware;