import mongoose, { Schema } from 'mongoose';

import { TemperatureVal } from '~/shared/regex';
import * as Constants from '~/shared/constants';
import * as Types from '~/shared/types';

const DailySchema = new Schema(
  {
    date: { type: Date, required: true, default: Date.now },
    temperature: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => TemperatureVal.test(`${v}`),
        message: (props) =>
          `${props.value as number} is not a valid temperature!`
      }
    },
    mucusType: {
      type: String,
      required: true,
      enum: {
        values: Constants.MucusTypes,
        message: '{VALUE} is not supported'
      }
    },
    mucusAspect: {
      type: String,
      required: true,
      enum: {
        values: Constants.MucusAspect,
        message: '{VALUE} is not supported'
      }
    },
    sensation: {
      type: String,
      required: true,
      enum: {
        values: Constants.Sensation,
        message: '{VALUE} is not supported'
      }
    },
    swollenBreasts: { type: Boolean },
    intermenstrualPain: { type: Boolean },
    disorders: { type: Boolean },
    sexualRelations: { type: Boolean },
    testLH: { type: Boolean },
    cervix: {
      type: String,
      minlength: [
        3,
        'The string "{VALUE}" must be at least {MINLENGTH} characters long'
      ],
      maxlength: [
        16,
        'The string "{VALUE}" must be at most {MAXLENGTH} characters long'
      ]
    },
    comments: {
      type: String,
      minlength: [
        3,
        'The string "{VALUE}" must be at least {MINLENGTH} characters long'
      ],
      maxlength: [
        100,
        'The string "{VALUE}" must be at most {MAXLENGTH} characters long'
      ]
    }
  },
  { timestamps: true }
);

const Daily = mongoose.model<Types.Daily>('Daily', DailySchema);

export default Daily;
