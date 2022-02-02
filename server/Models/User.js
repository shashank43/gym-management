import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'User');

const User = mongoose.model('user', userSchema);

export default User;