// auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AppController {
  @Get('user')
  @UseGuards(AuthGuard('azure-ad'))
  async login(@Req() req: Request, @Res() reply: Response) {
    try{
      if(req['user']){
        await reply.status(200).send({ name: req['user'] });
      }
    }
    catch(err){
   throw err
    }
  }
}
