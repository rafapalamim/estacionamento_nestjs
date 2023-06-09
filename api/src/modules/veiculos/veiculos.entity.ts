import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../@base/entities/base.entity';
import { TipoVeiculoEnum } from '../@base/enums/tipo.veiculo.enum';

@Entity('veiculos')
export default class VeiculosEntity extends BaseEntity {
  @Column({
    nullable: false,
    length: 100,
  })
  marca: string;

  @Column({
    nullable: false,
    length: 100,
  })
  modelo: string;

  @Column({
    nullable: false,
    length: 50,
  })
  cor: string;

  @Column({
    nullable: false,
    length: 7,
    unique: true,
  })
  placa: string;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: TipoVeiculoEnum,
  })
  tipo: TipoVeiculoEnum;
}
