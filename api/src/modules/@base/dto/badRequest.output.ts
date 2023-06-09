import { ApiProperty } from '@nestjs/swagger';

export class BadRequestOutput {
  @ApiProperty({
    default: 400,
  })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
