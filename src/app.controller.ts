import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async healthCheck() {
    return HttpStatus.OK;
  }
}
