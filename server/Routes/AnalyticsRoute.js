import express from 'express';
import getAnalytics from '../Controllers/Analytics/getAnalytics.js';
import getExpiredMembershipReq from '../Controllers/Analytics/getExpiredMembershipReq.js';

const AnalyticsRoute = express.Router();

AnalyticsRoute.get('/', getAnalytics);
AnalyticsRoute.get('/expired-memberships', getExpiredMembershipReq);

export default AnalyticsRoute;