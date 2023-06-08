import { ApiProperty } from '@nestjs/swagger';

export class ThrowableError {
  @ApiProperty({
    default: 400,
  })
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({
    default: 'bad request',
  })
  error: string;
}
