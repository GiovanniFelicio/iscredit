import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany} from "typeorm";

import {EnumRoleUser} from '@models/enums/EnumRoleUser';
import { Authorization } from "./Authorization";
import { Consent } from "./Consent";

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

    @Column({nullable: true, unique: true})
    document: string;

    @Column({nullable: true})
    password: string;

    @OneToOne(() => Authorization, auth => auth.user)
    @JoinColumn()
    authorizationToken: Authorization;

    @OneToMany(() => Consent, consent => consent.user)
    consents: Consent[];

    @Column({nullable: false, length: 2})
    role: EnumRoleUser;

    @Column({name: 'session_token' ,nullable: true})
    sessionToken: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}
