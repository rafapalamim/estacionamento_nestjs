import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindUsuarioOutput } from '../usuarios/dto/find.dto';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return null;
    }

    return user;
  }

  async login(user: FindUsuarioOutput) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
