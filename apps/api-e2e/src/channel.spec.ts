import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../api/src/app.module';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateChannelDto } from '../../api/src/core/channel/dto/create-channel.dto';

describe('ChannelController (e2e)', () => {
  let app: INestApplication;

  let employeeId = '';
  let bearerToken = '';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    /**
     * On this test group we need Employee with Bearer Token
     */
    const employee = await request(app.getHttpServer()).post('/employee').send({
      firstName: 'Tester',
    });

    expect(employee.body).toHaveProperty('ok', true);
    expect(employee.body).toHaveProperty('result.id');

    employeeId = employee.body.result.id;

    // Create Employee Contact
    const contact = await request(app.getHttpServer())
      .post('/employee/contact')
      .send({
        employeeId,
        type: 'EMAIL',
        value: 'tester@test.org',
        isUsedForAuthentication: true,
      });

    expect(contact.body).toHaveProperty('ok', true);

    // Create Employee Password
    const password = await request(app.getHttpServer())
      .post('/employee/password')
      .send({
        employeeId,
        password: '12345678',
      });

    expect(password.body).toHaveProperty('ok', true);

    // Create Employee Permission: EDIT_CHANNELS
    const permission = await request(app.getHttpServer())
      .post('/employee/permission')
      .send({
        employeeId,
        type: 'EDIT_CHANNELS',
      });

    expect(permission.body).toHaveProperty('ok', true);

    // Sign In to get Bearer Token
    const sign = await request(app.getHttpServer())
      .post('/employee/email')
      .send({
        email: 'tester@test.org',
        password: '12345678',
      });

    expect(sign.body).toHaveProperty('ok', true);
    expect(sign.body).toHaveProperty('result.access_token');

    // OK, now we have Token
    bearerToken = `Bearer ${sign.body.result.access_token}`;
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('#createChannel', () => {
    const newChannelDto: CreateChannelDto = {
      slug: 'test',
      name: 'test',
      currencyCode: 'USD',
      languageCode: 'EN',
      countryCode: 'US',
    };

    it('Should return 401 Unauthorized', async () => {
      const response = await request(app.getHttpServer())
        .post('/channel')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
    });

    describe('Actions that require Authorization', () => {
      it('Should return 400 on creating new Channel with bad data', async () => {
        const response = await request(app.getHttpServer())
          .post('/channel')
          .send({})
          .set('Accept', 'application/json')
          .set('Authorization', bearerToken);

        expect(response.status).toEqual(400);
      });

      it('Should return 201 on creating new Channel with good data', async () => {
        const response = await request(app.getHttpServer())
          .post('/channel')
          .send(newChannelDto)
          .set('Accept', 'application/json')
          .set('Authorization', bearerToken);

        expect(response.body).toHaveProperty('ok', true);
        expect(response.body).toHaveProperty('result.id');
        expect(response.status).toEqual(201);
      });
    });
  });

  describe('#findAllChannels', () => {
    it('Should return all Channels', async () => {
      return request(app.getHttpServer())
        .get('/channel/list')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toBeDefined();
        });
    });
  });

  describe('#findChannelById', () => {
    it('Should return 404', async () => {
      return request(app.getHttpServer()).get('/channel/123').expect(404);
    });
  });
});
