import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;
}
