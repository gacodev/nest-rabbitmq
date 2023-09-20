import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Registries } from './interfaces/registries.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/view')
  getregistriestotheview(): Registries {
    return this.appService.getDataToTheView();
  }

  @Get('/registries')
  getregistries(): Registries {
    return this.appService.getData();
  }

  @Post('/registries')
  test(@Body() data): Registries {
    return this.appService.sendMessage(data.data);
  }
}
