import { Module } from '@nestjs/common';
import { sqliteProvider } from '../providers/sqlite.provider';

@Module({
  providers: [...sqliteProvider],
  exports: [...sqliteProvider],
})
export class SQLiteModule {}
