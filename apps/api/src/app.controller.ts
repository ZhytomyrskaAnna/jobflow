import { Controller, Get } from '@nestjs/common';import { AppService } from './app.service';

@Controller('api')
export class AppController {
 @Get('health')
  health() {
    return {
      status: 'ok',
    };
  }
}
