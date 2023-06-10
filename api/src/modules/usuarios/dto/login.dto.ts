import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioInput {
  @ApiProperty({
    default: 'admin@mail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    default: 'password',
    required: true,
  })
  senha: string;
}
