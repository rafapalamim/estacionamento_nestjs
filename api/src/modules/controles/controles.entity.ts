import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../@base/entities/base.entity';
import { TipoVeiculoEnum } from '../@base/enums/tipo.veiculo.enum';

@Entity('controles')
export default class ControlesEntity extends BaseEntity {
  @Column({
    nullable: false,
  })
  estabelecimento_id: number;

  @Column({
    nullable: false,
  })
  veiculo_id: number;

  @Column({
    nullable: false,
    type: String,
  })
  veiculo_tipo: TipoVeiculoEnum;

  @Column({
    nullable: false,
  })
  data_entrada: Date;

  @Column({
    nullable: true,
  })
  data_saida: Date | null;
}
