import { express, jwt } from '../../configs/config';

interface CustomRequest extends express.Request {
  id: string;
}

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}

export {
  CustomRequest,
  CustomJwtPayload
};