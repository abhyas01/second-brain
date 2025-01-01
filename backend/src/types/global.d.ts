import { jwt } from '../configs/config';

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id?: string;
  }
}

export {};