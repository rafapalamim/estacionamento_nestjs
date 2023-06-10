import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('REPOSITORY') private repository: Repository<UsuariosEntity>,
  ) {}

  async findByEmail(email: string): Promise<UsuariosEntity> {
    return await this.repository.findOneBy({ email });
  }
}
