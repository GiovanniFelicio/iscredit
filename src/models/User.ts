import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn} from "typeorm";

import {EnumRoleUser} from '@enums/EnumRoleUser';    

@Entity('user')
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
}
