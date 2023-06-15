import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../@base/entities/base.entity';
import { TipoVeiculoEnum } from '../@base/enums/tipo.veiculo.enum';
import VeiculosEntity from '../veiculos/veiculos.entity';
import EstabelecimentosEntity from '../estabelecimentos/estabelecimentos.entity';

@Entity('controles')
export default class ControlesEntity extends BaseEntity {
  @OneToOne(
    () => EstabelecimentosEntity,
    (estabelecimento) => estabelecimento.id,
  )
  estabelecimento: EstabelecimentosEntity;

  @Column({
    nullable: false,
  })
  estabelecimento_id: number;

  @OneToOne(() => VeiculosEntity, (veiculo) => veiculo.id)
  veiculos: VeiculosEntity;

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
