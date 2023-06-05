import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('estabelecimentos')
export class EstabelecimentoEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
