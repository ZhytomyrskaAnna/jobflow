import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check(@Res() response: Response) {
    const databaseAvailable = await this.healthService.checkDatabase();

    if (databaseAvailable) {
      return response.status(HttpStatus.OK).json({
        status: 'ok',
        database: 'up',
      });
    }

    return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      status: 'error',
      database: 'down',
    });
  }
}