import express from 'express';
import getAnalytics from '../Controllers/Analytics/getAnalytics.js';
const AnalyticsRoute = express.Router();

AnalyticsRoute.get('/', getAnalytics);

export default AnalyticsRoute;