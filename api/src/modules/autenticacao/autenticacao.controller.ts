import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { AutenticacaoService } from './autenticacao.service';

@ApiTags('autenticacao')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private authService: AutenticacaoService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
