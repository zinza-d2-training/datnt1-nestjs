import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class vaccine1676046331119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccine',
        columns: [
          {
            name: 'vaccine_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'lot_number',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'create_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'delete_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccine');
  }
}
