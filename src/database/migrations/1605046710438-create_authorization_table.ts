import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAuthorizationTable1605046710438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(
        //     `CREATE TABLE AUTHORIZATION(
        //         id integer PRIMARY KEY AUTOINCREMENT,
        //         access_token clob,
        //         id_user integer,
        //         expire_at timestamp,
        //         created_at timestamp default(DATETIME('now')),
        //         updated_at timestamp 
        //     )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table AUTHORIZATION');
    }

}
