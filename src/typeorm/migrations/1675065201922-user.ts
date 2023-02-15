import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class user1675065201922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_id',
            type: 'int',
            default: 1,
          },
          {
            name: 'identification_card',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'health_insurance_number',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'reset_password_token',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'fullname',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'birthday',
            type: 'date',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'ward_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['ward_id'],
        referencedTableName: 'ward',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'role',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
