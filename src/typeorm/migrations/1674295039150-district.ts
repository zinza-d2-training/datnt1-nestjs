import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class district1674295039150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'district',
        columns: [
          {
            name: 'district_id',
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
            name: 'province_id',
            type: 'int'
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

    await queryRunner.createForeignKey(
      'district',
      new TableForeignKey({
        columnNames: ['province_id'],
        referencedColumnNames: ['province_id'],
        referencedTableName: 'province',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('district');
  }
}
