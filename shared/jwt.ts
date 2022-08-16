import { Request } from 'express';
import jwt from 'jsonwebtoken';

import * as Types from '~/shared/types';
import * as Constants from '~/shared/constants';

export const TokenValidation = (req: Request): Promise<Types.JWTDecoded> =>
  new Promise<Types.JWTDecoded>((resolve, reject) => {
    const token = req.headers['access-token'];

    jwt.verify(token as string, Constants.PrivateKeyJWT, (err, decoded) => {
      if (decoded) {
        console.warn(decoded, 'Jwt Info');
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  });
