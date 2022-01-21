import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const memberSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    contactNumber: String,
    gender: String,
    joining: String,
    endOfMembership: String
}); 

autoIncrement.initialize(mongoose.connection);
memberSchema.plugin(autoIncrement.plugin, 'Member');

const Member = mongoose.model('member', memberSchema);

export default Member;