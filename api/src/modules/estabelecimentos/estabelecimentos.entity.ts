import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../@base/entities/base.entity';

@Entity('estabelecimentos')
export default class EstabelecimentosEntity extends BaseEntity {
  @Column({
    nullable: false,
    length: 180,
  })
  nome: string;

  @Column({
    nullable: false,
    length: 14,
  })
  cnpj: string;

  @Column({
    nullable: false,
  })
  endereco: string;

  @Column({
    nullable: false,
    length: 13,
  })
  telefone: string;

  @Column({
    nullable: false,
    unsigned: true,
    default: 0,
  })
  quantidade_vagas_motos: number;

  @Column({
    nullable: false,
    unsigned: true,
    default: 0,
  })
  quantidade_vagas_carros: number;
}
