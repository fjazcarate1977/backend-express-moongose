import { Request, Response } from 'express';

import Daily from '~/models/daily-model';

import { TokenValidation } from '~/shared/jwt';

const createDailyMG = async (req: Request, res: Response): Promise<unknown> =>
  await Daily.create(req.body, (error: Error, doc: unknown) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error,
        message: 'Daily not created!'
      });
    }
    return res
      .status(201)
      .json({ success: true, data: doc, message: 'Daily created!' });
  });

export default async (req: Request, res: Response): Promise<void> => {
  await TokenValidation(req)
    .then(async () => {
      try {
        await createDailyMG(req, res);
      } catch (error) {
        res.status(400).json(error);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
