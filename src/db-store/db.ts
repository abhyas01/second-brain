import { mongoose } from "../configs/config";

const Model = mongoose.model;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserModel = Model('users', UserSchema);

export {
  UserModel
}