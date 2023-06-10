import { ApiProperty } from '@nestjs/swagger';

export default class TimestampsDTO {
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({
    default: null,
    required: false,
  })
  deleted_at: Date | null;
}
