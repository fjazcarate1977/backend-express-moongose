import express from 'express';

import * as UserController from '~/controllers/user/user-ctrl';

const UserRouter = express.Router();

UserRouter.route('/user').post(UserController.createUser);
UserRouter.route('/get-user-session-validation').post(
  UserController.getUserSessionValidation
);

export default UserRouter;
