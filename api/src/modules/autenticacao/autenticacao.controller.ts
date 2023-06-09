import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { AutenticacaoService } from './autenticacao.service';
import { LoginUsuarioInput } from '../usuarios/dto/login.dto';
import { TokenOuput } from './dto/login.dto';
import { Unauthorized } from '../@base/dto/Unauthorized.output';

type UserLogin = {
  id: number;
  email: string;
};

@ApiTags('autenticacao')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private authService: AutenticacaoService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Autenticado com sucesso',
    type: TokenOuput,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário e/ou senha incorretos',
    type: Unauthorized,
  })
  async login(@Body() data: LoginUsuarioInput, @Request() req: UserLogin) {
    return this.authService.login(req);
  }
}
