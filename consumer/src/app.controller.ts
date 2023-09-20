import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'store' })
  async accumulate(data: string): Promise<string> {
    return this.appService.createRegistry(data);
  }

  @MessagePattern({ cmd: 'get' })
  async getRegistry(): Promise<unknown> {
    return this.appService.getRegistries();
  }
}
