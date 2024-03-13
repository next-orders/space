import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../api/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('/health', () => {
    it('Should return ok status', async () => {
      const health = await request(app.getHttpServer()).get('/health');

      expect(health.status).toBe(200);
      expect(health.body).toHaveProperty('ok', true);
    });
  });

  describe('/version', () => {
    it('Should return API version', async () => {
      return request(app.getHttpServer())
        .get('/version')
        .expect(200)
        .expect(({ body }) => {
          expect(body.ok).toBeDefined();
          expect(body.ok).toEqual(true);
          expect(body.version).toBeDefined();
        });
    });
  });
});
