import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Req() request: Request) {
    const respon=request.rawHeaders;
    return respon;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
