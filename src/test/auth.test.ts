import request from 'supertest';
import { App } from '@/app';
import { HealthController } from '@controllers/health.controller';

describe('Testing server health', () => {
  describe('[POST] /api/health', () => {
    it('response should return status code 200', async () => {
      const app = new App([HealthController]);
      return request(app.getServer()).get('/api/health').expect(200);
    });
  });
});
