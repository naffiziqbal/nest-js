import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  checkApi(): { message: string } {
    return { message: 'Api is Online' };
  }
}
