import { Request, Response } from 'express';

import Daily from '~/models/daily-model';

import { TokenValidation } from '~/shared/jwt';

const getDailyByIdMG = async (req: Request, res: Response): Promise<unknown> =>
  await Daily.findById(req.params.id, (error: Error, doc: unknown) => {
    if (error) {
      return res
        .status(400)
        .json({ success: false, error, message: 'Daily not founded!' });
    }

    return res
      .status(200)
      .json({ success: true, data: doc, message: 'Daily founded!' });
  });

export default async (req: Request, res: Response): Promise<void> => {
  await TokenValidation(req)
    .then(async () => {
      try {
        await getDailyByIdMG(req, res);
      } catch (error) {
        res.status(400).json(error);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
