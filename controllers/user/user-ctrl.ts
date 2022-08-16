import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '~/models/user-model';

import * as Types from '~/shared/types';
import * as Constants from '~/shared/constants';

interface BodyRequest<T> extends Request {
  body: T;
}

export const createUser = (req: Request, res: Response): void => {
  const user = new User(req.body);

  user
    .save()
    .then(() =>
      res.status(201).json({
        success: true,
        user,
        message: 'User created!'
      })
    )
    .catch((error: Error) =>
      res.status(400).json({
        success: false,
        error,
        message: 'User not created!'
      })
    );
};

export const getUserSessionValidation = async (
  req: BodyRequest<Types.User>,
  res: Response
): Promise<void | Response> => {
  const { name, email, password } = req.body;

  if ((name || email) && password) {
    const query = name ? { name } : { email };
    try {
      await User.findOne(query, (error: Error, doc: Types.User) => {
        if (doc.password === password) {
          const payload = {
            check: true
          };
          const token = jwt.sign(payload, Constants.PrivateKeyJWT, {
            expiresIn: '1h'
          });
          return res.status(200).json({
            success: true,
            data: doc,
            token,
            message: 'User founded, session validated!'
          });
        } else {
          return res.status(400).json({
            success: false,
            error,
            message: 'User/email or password was wrong, session not validated!'
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong, session not validated!'
    });
  }
};
