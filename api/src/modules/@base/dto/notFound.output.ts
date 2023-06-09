import { ApiProperty } from '@nestjs/swagger';

export class NotFoundOutput {
  @ApiProperty({
    default: 404,
  })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
