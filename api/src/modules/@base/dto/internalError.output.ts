import { ApiProperty } from '@nestjs/swagger';

export class InternalErrorOutput {
  @ApiProperty({
    default: 500,
  })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
