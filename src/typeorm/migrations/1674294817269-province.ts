import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class province1674294817269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'province',
        columns: [
          {
            name: 'province_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'create_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'update_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'delete_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('province');
  }
}
