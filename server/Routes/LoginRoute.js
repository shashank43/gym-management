import express from 'express'
import loginUser from '../Controllers/User/loginUser.js';

const LoginRoute = express.Router();

LoginRoute.post('/', loginUser);

export default LoginRoute;