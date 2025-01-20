import { mongoose } from "../configs/config";

const Model = mongoose.model;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const ContentSchema = new Schema({
  type: {
    type: String,
    enum: ['Other', 'Tweet', 'YouTube']
  },
  link: { type: String, required: true },
  title: { type: String, required: true },
  userId: { type: ObjectId, ref: 'users', required: true }
});

const LinkSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: ObjectId, ref: 'users', required: true, unique: true }
});

const RevokedTokens = new Schema({
  userId: { type: ObjectId, ref: 'users', required: true, unique: true },
  tokens: [{
    token: String,
    expiresAt: Date
  }]
});

const UserModel = Model('users', UserSchema);
const ContentModel = Model('content', ContentSchema);
const LinkModel = Model('link', LinkSchema);
const RevokedModel = Model('revoked-tokens', RevokedTokens);

export {
  UserModel,
  ContentModel,
  LinkModel,
  RevokedModel
};