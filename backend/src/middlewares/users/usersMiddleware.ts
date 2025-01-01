import { express, jwt, JWT_SECRET } from '../../configs/config';
import { UserModel } from '../../db-store/db';

function usersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): any {
  try{
    const token = req.headers['auth-key'];
    if (!token || typeof(token) !== 'string'){
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    jwt.verify(<string>token, <string>JWT_SECRET, async (err, decoded): Promise<any> => {
      if(!err){
        const userId = (decoded as jwt.JwtPayload).id;
        let findUser;
        try{
          findUser = await UserModel.findOne({
            _id: userId
          });
        } catch(err){
          return res.status(403).json( { msg: 'Couldn\'t find your account' } );
        }
        if (!findUser) return res.status(403).json( { msg: 'Couldn\'t find your account' } );
        req.id = userId;
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