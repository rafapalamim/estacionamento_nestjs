import { ApiProperty } from '@nestjs/swagger';

export class NotFoundOutput {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
