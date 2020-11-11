import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn} from "typeorm";

import {EnumRoleUser} from '@enums/EnumRoleUser';    

@Entity('USER')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({nullable: true, unique: true, length: 50})
    login: string;

    @Column({nullable: true, unique: true})
    email: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: false, length: 2})
    role: EnumRoleUser;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
}
