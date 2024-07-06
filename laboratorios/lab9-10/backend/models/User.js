import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 4,
    maxLength: 20,
  },
  password: String,
  name: String,
  token: String,
});

UserSchema.methods.hashPassword = function hashPassword() {
  this.password = bcrypt.hashSync(this.password, 10);
}

UserSchema.statics.login = async function login({ username, password }) {
  const user = await this.findOne({ username });
  if (!user) {
    return { status: false, message: 'User or password are invalid' };
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return { status: false, message: 'User or password are invalid' };
  }
  user.token = bcrypt.hashSync(user.username + user.password, 10);
  await user.save();
  return { status: true, message: 'Login successful', user };
}

const User = mongoose.model('User', UserSchema);

export default User;