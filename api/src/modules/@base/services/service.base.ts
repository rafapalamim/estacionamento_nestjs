import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

export default abstract class BaseService<T> {
  constructor(
    @Inject('REPOSITORY')
    protected readonly repository: Repository<T>,
  ) {}
}
