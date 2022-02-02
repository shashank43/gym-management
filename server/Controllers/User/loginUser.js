import User from "../../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function loginUser(req, res) {
    const user = await User.findOne({
        username: req.body.username,
    });

    if(!user) { //user not found
        res.json({ 'status': 'error', 'error': 'Invalid Login', user: false });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if(isPasswordValid) {
        const token = jwt.sign({
            username: user.username 
        }, 'secret123');
        res.json({ 'status': 'ok', user: token });
    }
    else { 
        res.json({ 'status': 'error', user: false });
    }
}

export default loginUser;