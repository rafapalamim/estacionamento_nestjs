import { ApiProperty } from '@nestjs/swagger';

export class ParseLoginToToken {
  id: number;
  email: string;
}

export class TokenOuput {
  @ApiProperty({
    description: 'Token JWT',
  })
  access_token: string;
}
