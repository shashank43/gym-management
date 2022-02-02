import Express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import MemberRoute from "./Routes/MemberRoute.js";
import PaymentRoute from "./Routes/PaymentRoute.js";
import AnalyticsRoute from "./Routes/AnalyticsRoute.js";
import SignupRoute from "./Routes/SignupRoute.js";
import LoginRoute from "./Routes/LoginRoute.js";

const app = Express();
//backend server running on this port
const PORT = 8000;

//enabling cross-origin requests and parsing incoming json
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/members', MemberRoute);
app.use('/payments', PaymentRoute);
app.use('/analytics', AnalyticsRoute);
app.use('/signup', SignupRoute);
app.use('/login', LoginRoute);

const URL = 'mongodb+srv://admin-shashank:admin-shashank@cluster0.dbqlf.mongodb.net/gymDB?retryWrites=true&w=majority';

//connecting backend to mongoDB server
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        //connection successful
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });
    })
    .catch((error) => {
        //connection unsuccesssful
        console.error(error.message);
    });
