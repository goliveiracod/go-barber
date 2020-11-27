import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Linha do tempo
 * 1 æ semana: Agendamentos
 * 2 æ semana: Usuário
 * (NOVO DEV) 3³ edição em Agendamentos
 * 4æ semana: Compras
 * Como vamos controlar todas as alterações feitas em banco de dados, trabalhando
 * com vários dev simultaneamente?
 * É pra isso que serve as migrations, evitar que os bancos de dados estejam
 * em versões diferentes.
 * A migration só pode ser alterada se ainda não foi mandada para produção.
 * Caso contrário, se desejar fazer uma nova modificação, deverá ser criada uma nova
 * migration para fazer a alteração.
 */

export default class CreateAppointments1604483355794
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
