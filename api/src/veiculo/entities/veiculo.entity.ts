import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('veiculos')
export class VeiculoEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    nullable: false,
    length: 100,
  })
  marca: string;

  @Column({
    nullable: false,
    length: 80,
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
  })
  placa: string;

  @Column({
    nullable: false,
    length: 50,
  })
  tipo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
