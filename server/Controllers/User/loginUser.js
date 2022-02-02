import User from "../../Models/User.js";
import jwt from 'jsonwebtoken';

async function loginUser(req, res) {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {  //user exists
        const token = jwt.sign({
            username: user.username 
        }, 'secret123');
        res.json({ 'status': 'ok', user: token });
    }
    else { //user not found
        res.json({ 'status': 'error', user: false });
    }
}

export default loginUser;