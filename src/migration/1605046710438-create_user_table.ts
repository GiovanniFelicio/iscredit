import { User } from "@models/User";
import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUserTable1605046710438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.query(
            `CREATE TABLE USER(
                id int(11) auto_increment primary key,
                name varchar(100) not null,
                login varchar(30) not null unique,
                email varchar(80) not null unique,
                password varchar(30) not null,
                role int(2) not null,
                created_at timestamp default(NOW()),
                updated_at timestamp 
            )`);
        // await queryRunner.createTable(
        //     new Table(
        //         {
        //             name: "user",
        //             columns: [
        //                 {
        //                     name: "id",
        //                     type: "int",
        //                     isPrimary: true
        //                 },
        //                 {
        //                     name: "name",
        //                     type: "varchar(100)",
        //                     isNullable: false
        //                 },
        //                 {
        //                     name: "login",
        //                     type: "varchar",
        //                     isNullable: false,
        //                     isUnique: true
        //                 },
        //                 {
        //                     name: "password",
        //                     type: "varchar",
        //                     isNullable: false
        //                 },
        //                 {
        //                     name: "email",
        //                     type: "varchar",
        //                     isNullable: false,
        //                     isUnique: true
        //                 },
        //                 {
        //                     name: "role",
        //                     type: "int"
        //                 },
        //                 {
        //                     name: "created_at",
        //                     type: "timestamp",
        //                     default: "now()"
        //                 },
        //                 {
        //                     name: "updated_at",
        //                     type: "timestamp",
        //                     default: "now()"
        //                 },
        //             ]
        //         }
        //     )
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('user');
    }

}
