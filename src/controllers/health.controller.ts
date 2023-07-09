import { Controller, Get, HttpError, OnUndefined } from 'routing-controllers';
import mongoose from 'mongoose';

@Controller()
export class HealthController {
  @Get('/health')
  @OnUndefined(200)
  async checkHealth() {
    if (![1, 2].includes(mongoose.connection.readyState)) {
      throw new HttpError(500, 'Server is not connected to database');
    }
    return;
  }
}
