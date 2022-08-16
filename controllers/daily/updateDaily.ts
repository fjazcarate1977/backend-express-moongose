import { Request, Response } from 'express';

import Daily from '~/models/daily-model';

import * as Types from '~/shared/types';
import { TokenValidation } from '~/shared/jwt';

interface BodyRequest<T> extends Request {
  body: T;
}

const updateDailyMG = async (
  req: BodyRequest<Types.Daily>,
  res: Response
): Promise<unknown> => {
  const { body } = req;
  return await Daily.findOneAndUpdate(
    { _id: req.params.id },
    body,
    {
      new: true,
      runValidators: true
    },
    (error: Error, doc: unknown) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error,
          message: 'Daily not updated!'
        });
      }
      return res
        .status(200)
        .json({ success: true, data: doc, message: 'Daily updated!' });
    }
  );
};

export default async (
  req: BodyRequest<Types.Daily>,
  res: Response
): Promise<void> => {
  await TokenValidation(req)
    .then(async () => {
      try {
        await updateDailyMG(req, res);
      } catch (error) {
        res.status(400).json(error);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
