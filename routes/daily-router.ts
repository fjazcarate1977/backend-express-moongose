import express from 'express';

import DailyController from '~/controllers/daily';

const DailyRouter = express.Router();

DailyRouter.route('/').get(DailyController.getAllDailies);
DailyRouter.route('/:id').get(DailyController.getDailyById);
DailyRouter.route('/:id').put(DailyController.updateDaily);
DailyRouter.route('/:id').delete(DailyController.deleteDaily);
DailyRouter.route('/daily').post(DailyController.createDaily);

export default DailyRouter;
