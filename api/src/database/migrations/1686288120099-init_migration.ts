import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1686288120099 implements MigrationInterface {
  name = 'InitMigration1686288120099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`nome\` varchar(150) NOT NULL, \`email\` varchar(100) NOT NULL, \`senha\` varchar(60) NOT NULL, UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`estabelecimentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`nome\` varchar(180) NOT NULL, \`cnpj\` varchar(14) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`telefone\` varchar(13) NOT NULL, \`quantidade_vagas_motos\` int UNSIGNED NOT NULL DEFAULT '0', \`quantidade_vagas_carros\` int UNSIGNED NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`veiculos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`marca\` varchar(100) NOT NULL, \`modelo\` varchar(100) NOT NULL, \`cor\` varchar(50) NOT NULL, \`placa\` varchar(7) NOT NULL, \`tipo\` enum ('MOTO', 'CARRO') NOT NULL, UNIQUE INDEX \`IDX_3c7f2de70c4765a04c070a9f74\` (\`placa\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`controles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`estabelecimento_id\` int NOT NULL, \`veiculo_id\` int NOT NULL, \`veiculo_tipo\` varchar(255) NOT NULL, \`data_entrada\` datetime NOT NULL, \`data_saida\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`controles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3c7f2de70c4765a04c070a9f74\` ON \`veiculos\``,
    );
    await queryRunner.query(`DROP TABLE \`veiculos\``);
    await queryRunner.query(`DROP TABLE \`estabelecimentos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``,
    );
    await queryRunner.query(`DROP TABLE \`usuarios\``);
  }
}
