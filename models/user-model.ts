import mongoose, { Schema } from 'mongoose';

import { MailVal, PasswordVal } from '~/shared/regex';
import * as Types from '~/shared/types';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        3,
        'The string "{VALUE}" must be at least {MINLENGTH} characters long'
      ],
      maxlength: [
        16,
        'The string "{VALUE}" must be at most {MAXLENGTH} characters long'
      ]
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => MailVal.test(v),
        message: (props) => `${props.value as string} is not a valid email!`
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => PasswordVal.test(v),
        message: (props) =>
          `${
            props.value as string
          } is not a valid password, must include at least one special character: @!$&%-_, one number, one capital letter, one lowercase letter and between 8 and 12 characters!`
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model<Types.User>('User', UserSchema);

export default User;
