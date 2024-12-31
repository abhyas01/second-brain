import { express, jwt, JWT_SECRET } from '../../configs/config';
import { CustomRequest, CustomJwtPayload } from './interfaces';

function usersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): any {
  try{
    const token = req.headers['auth-key'];
    if (!token || typeof(token) !== 'string'){
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    jwt.verify(<string>token, <string>JWT_SECRET, (err, decoded) => {
      if(!err){
        (req as CustomRequest).id = (decoded as CustomJwtPayload).id;
        next();
      } else{
        res.status(401).json({ msg: 'Unauthorized' });
      }
    });
  } catch (err){
    res.status(500).json({ msg: 'Server is facing error' });
  }
}

export default usersMiddleware;