import { BaseEntity } from 'src/modules/@base/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('usuarios')
export class UsuariosEntity extends BaseEntity {
  @Column({
    length: 150,
    nullable: false,
  })
  nome: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    length: 60,
    nullable: false,
  })
  senha: string;
}
