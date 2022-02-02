import User from "../../Models/User.js";

async function addUser(req, res) {
    const user = req.body;
    const newUser = new User(user);

    try {
        await newUser.save();
        res.json({'status': 'ok'});
    } catch (error) {
        res.json({'status': 'error'});
    }
}

export default addUser;