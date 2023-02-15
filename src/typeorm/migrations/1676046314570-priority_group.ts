import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class priorityGroup1676046314570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'priority_group',
        columns: [
          {
            name: 'priority_group_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
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
    await queryRunner.dropTable('priority_group');
  }
}
