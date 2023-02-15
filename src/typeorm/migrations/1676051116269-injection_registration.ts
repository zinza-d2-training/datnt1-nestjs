import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class injectionRegistration1676051116269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'injection_registration',
        columns: [
          {
            name: 'injection_registration_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'health_insurance_number',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'occupation',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'work_unit',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'expected_injection_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'injection_session',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'vaccination_agreement',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'injection_register_code',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'injection_time',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'priority_group_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'vaccination_site_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'vaccine_id',
            type: 'int',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'injection_registration',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'injection_registration',
      new TableForeignKey({
        columnNames: ['priority_group_id'],
        referencedColumnNames: ['priority_group_id'],
        referencedTableName: 'priority_group',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'injection_registration',
      new TableForeignKey({
        columnNames: ['vaccination_site_id'],
        referencedColumnNames: ['vaccination_site_id'],
        referencedTableName: 'vaccination_site',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'injection_registration',
      new TableForeignKey({
        columnNames: ['vaccine_id'],
        referencedColumnNames: ['vaccine_id'],
        referencedTableName: 'vaccine',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('injection_registration');
  }
}
