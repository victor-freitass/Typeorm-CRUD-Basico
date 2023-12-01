import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1674307725393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contents',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        length: '500',
                        isNullable: false
                    },
                    {
                        name: 'imageUrl',
                        type: 'varchar',
                        length: '100'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contents')
    }

}