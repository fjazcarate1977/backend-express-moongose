import { Request, Response } from 'express';

import Daily from '~/models/daily-model';

import { TokenValidation } from '~/shared/jwt';

const deleteDailyMG = async (req: Request, res: Response): Promise<unknown> =>
  await Daily.findOneAndDelete(
    { _id: req.params.id },
    null,
    (error: Error, doc: unknown) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, error, message: 'Daily not deleted!' });
      }

      return res
        .status(200)
        .json({ success: true, data: doc, message: 'Daily deleted!' });
    }
  );

export default async (req: Request, res: Response): Promise<void> => {
  await TokenValidation(req)
    .then(async () => {
      try {
        await deleteDailyMG(req, res);
      } catch (error) {
        res.status(400).json(error);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
