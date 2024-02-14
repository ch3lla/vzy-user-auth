import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required and most be unique.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please specify a password'],
        minLength: [8, "password must be at least 8 characters long"],
        maxLength: [32, "Password must be less than 32 characters"],
    },
    status: {
      type: String,
      required: false,
    }
});

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('This username has not been registered on our system.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    return user;
};
  

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = model("User", userSchema);

export default User;