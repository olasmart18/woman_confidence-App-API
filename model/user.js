import { Schema, model } from "mongoose";

const userSchema = new Schema({

},
{ timestamps: true });

const User = new model('User', userSchema);

export default User;
