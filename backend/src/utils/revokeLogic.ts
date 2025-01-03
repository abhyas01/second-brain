import { RevokedModel } from "../db-store/db";
import { JWT_EXPIRY } from "../configs/config";

export async function revokeToken(token: string, userId: string): Promise<any> {
  try{
    const tokenExpiry = Number(JWT_EXPIRY as string);
    const expiryDate = new Date(Date.now() + tokenExpiry);
    let revokedTokenDoc = await RevokedModel.findOne({
      userId: userId
    });
    if(revokedTokenDoc){
      revokedTokenDoc.tokens.push({
        token: token,
        expiresAt: expiryDate
      });
      await revokedTokenDoc.save();
    } else {
      revokedTokenDoc = await RevokedModel.create({
        userId: userId,
        tokens: [{
          token: token,
          expiresAt: expiryDate
        }]
      });
    }
    return true;
  } catch (err){
    return false;
  }
}

export async function isTokenRevoked(token: string, userId: string): Promise<boolean> {
  try {
    const revokedTokenDoc = await RevokedModel.findOne({ userId: userId });
    if (revokedTokenDoc) {
      const validTokens = revokedTokenDoc.tokens.filter(t => t.expiresAt as Date > new Date());
      revokedTokenDoc.tokens.splice(0, revokedTokenDoc.tokens.length, ...validTokens);
      await revokedTokenDoc.save();
      return revokedTokenDoc.tokens.some(t => t.token === token);
    } else{
      return false;
    }
  } catch (err) {
    return true;
  }
}