import { jwt } from '../configs/config';

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
  }
}

export {};