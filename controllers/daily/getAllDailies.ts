import { Request, Response } from 'express';

import Daily from '~/models/daily-model';

import { TokenValidation } from '~/shared/jwt';

const getAllDailiesMG = async (res: Response): Promise<unknown> =>
  await Daily.find({}, (error: Error, docs: unknown) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error,
        message: 'Dailies array not recieved!'
      });
    }
    return res.status(200).json({
      success: true,
      data: docs,
      message: 'Dailies array recieved!'
    });
  });

export default async (req: Request, res: Response): Promise<void> => {
  await TokenValidation(req)
    .then(async () => {
      try {
        await getAllDailiesMG(res);
      } catch (error) {
        res.status(400).json(error);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
