import express from 'express';

import * as PerformanceController from '../../controllers/PerformanceController';

const router = express.Router();

router.get('/mixed-plan', PerformanceController.getPlanPerformance);

export default router;
