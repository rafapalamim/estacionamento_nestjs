import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AutenticacaoService } from './autenticacao.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AutenticacaoController } from './autenticacao.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy, JwtStrategy],
  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}
