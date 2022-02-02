import User from "../../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function addUser(req, res) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await User.create({
            username: req.body.username,
            password: hashedPassword
        });
        const token = jwt.sign({
            username: req.body.username
        }, 'secret123');
        res.json({ 'status': 'ok', user: token });
    } catch (error) {
        res.json({'status': 'error'});
    }
}

export default addUser;