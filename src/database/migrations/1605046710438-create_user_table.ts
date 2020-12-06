import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUserTable1605046710438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {    
        // await queryRunner.query(
        //     `CREATE TABLE USER(
        //         id integer PRIMARY KEY AUTOINCREMENT,
        //         name varchar(100) not null,
        //         login varchar(30) not null unique,
        //         email varchar(80) not null unique,
        //         password varchar(30) not null,
        //         role int(2) not null,
        //         session_token varchar(255),
        //         created_at timestamp default(DATETIME('now')),
        //         updated_at timestamp 
        //     )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table USER');
    }

}
