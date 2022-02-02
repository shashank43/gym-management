import express from 'express';
import addUser from '../Controllers/User/addUser.js';

const SignupRoute = express.Router();

SignupRoute.post('/', addUser);

export default SignupRoute;