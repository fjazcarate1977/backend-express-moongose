import { Document, Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface CreateDailyModel extends Document {
  success: boolean;
  data: Daily;
  message: string;
}

export interface CreateUserModel extends Document {
  success: boolean;
  user: User;
  message: string;
}

export interface PostUserSessionModel extends Document {
  success: boolean;
  data: User;
  token: string;
  message: string;
}

export type MucusType = 'menstruation' | 'remains' | 'mucus-free' | 'mucus';

export type MucusAspect = 'N' | 'B' | 'G' | 'P' | 'E' | 'ET' | 'GT' | 'PT';

export type Sensation = 'S' | 'H' | 'L' | 'M';

export interface Daily extends Document {
  _id?: Schema.Types.ObjectId | string;
  date: string;
  temperature: number;
  mucusType: MucusType;
  mucusAspect: MucusAspect;
  sensation: Sensation;
  createdAt: string;
  updatedAt: string;
  __v: number;
  swollenBreasts?: boolean;
  intermenstrualPain?: boolean;
  disorders?: boolean;
  sexualRelations?: boolean;
  testLH?: boolean;
  cervix?: string;
  comments?: string;
}

export interface User extends Document {
  _id?: Schema.Types.ObjectId | string;
  name: string;
  email: number;
  password: MucusType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type JWTDecoded = string | JwtPayload;
