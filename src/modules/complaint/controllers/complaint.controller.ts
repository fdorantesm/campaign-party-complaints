import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@Controller('/complaints')
export class ComplaintController {
  @UseGuards(JwtGuard)
  @Get('/')
  public index() {
    return 'mmm';
  }
}
