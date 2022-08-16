import request, { Response } from 'supertest';
import mongoose from 'mongoose';

import data from './mock.json';
import * as Types from '~/shared/types';
import Daily from '~/models/daily-model';

import server from '~/index';

interface CustomResponse<T> extends Response {
  body: T;
}

let jwt: string;
let initalRes: CustomResponse<Types.CreateDailyModel>;

describe('Test Dailies Endpoint', () => {
  beforeAll(async () => {
    const res: CustomResponse<Types.CreateUserModel> = await request(server)
      .post('/user-api/user')
      .send(data.user);
    const { user } = res.body;
    const resJWT: CustomResponse<Types.PostUserSessionModel> = await request(
      server
    )
      .post('/user-api/get-user-session-validation')
      .send(user);

    jwt = resJWT.body.token;

    initalRes = await request(server)
      .post('/api/daily')
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt)
      .send(data.daily);
  });
  it('create one daily succesfully', () => {
    expect(initalRes.statusCode).toEqual(201);
    expect(initalRes.body).toMatchObject({ success: true });
  });

  it('create one daily error sending wrong type fields', async () => {
    const res = await request(server)
      .post('/api/daily')
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt)
      .send({ ...data, temperature: 'temp' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject({ success: false });
  });

  it('update one daily succesfully', async () => {
    const { _id } = initalRes.body.data;
    const resUpdated = await request(server)
      .put(`/api/${_id as string}`)
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt)
      .send({ ...initalRes.body.data, mucusType: 'remains' });
    expect(resUpdated.statusCode).toEqual(200);
    expect(resUpdated.body).toMatchObject({ success: true });
  });

  it('should get all dailies array', async () => {
    const res = await request(server)
      .get('/api')
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt);
    expect(res.statusCode).toEqual(200);
  });

  it('get one daily succesfully', async () => {
    const { _id } = initalRes.body.data;
    const res = await request(server)
      .get(`/api/${_id as string}`)
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ success: true });
  });

  it('delete one daily succesfully', async () => {
    const { _id } = initalRes.body.data;
    const res = await request(server)
      .delete(`/api/${_id as string}`)
      .set('Authorization', 'X-API-KEY')
      .set('access-token', jwt);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ success: true });
  });

  afterAll(async () => {
    await Daily.deleteMany({});
    await mongoose.disconnect();
    server.close();
  });
});
