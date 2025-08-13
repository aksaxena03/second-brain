import 'dotenv/config'
import mongoose, { model, Schema } from 'mongoose'
import { string } from 'zod';
// import {db_url} from './config'
const db_url=process.env.db_url

if (db_url) {
  mongoose.connect(db_url).then(() => console.log('Connected!')).catch((error) => console.error('Connection error:', error));
} else {
  console.error('Database URL is not defined. Please set the db_url environment variable.');
}

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String
})

export const UserModel = model("User", UserSchema)

const TagSchema = new Schema({
  name: String
})

export const TagModel = model('Tag', TagSchema)

const ContentSchema = new Schema({
  title: String, 
  link: String, 
  Type:String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
})
export const ContentModel = model('Content', ContentSchema)

const LinkSchema = new Schema({
  hash: String, 
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
})
export const LinkModel = model('Link', LinkSchema)
