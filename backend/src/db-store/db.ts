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
    enum: ['Document', 'Tweet', 'YouTube', 'Link', 'Social'],
    required: true
  },
  link: { type: String, required: true },
  title: { type: String, required: true },
  tags: [ { type: ObjectId, ref: 'tags' } ],
  userId: { type: ObjectId, ref: 'users', required: true }
});

const TagsSchema = new Schema({
  title: { type: String, unique: true, required: true }
});

const LinkSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: ObjectId, ref: 'users', required: true }
});

const UserModel = Model('users', UserSchema);
const ContentModel = Model('content', ContentSchema);
const TagsModel = Model('tags', TagsSchema);
const LinkModel = Model('link', LinkSchema);

export {
  UserModel,
  ContentModel,
  TagsModel,
  LinkModel
};