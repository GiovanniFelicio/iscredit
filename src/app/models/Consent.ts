import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    JoinColumn,
    ManyToOne} from "typeorm";

import { User } from "./User";

@Entity('CONSENT')
export class Consent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    consentId: string;

    @ManyToOne(() => User, user => user.consents)
    user: User

    @Column({type: 'varchar', length: 80})
    expirationDateTime: Date;
    
    @Column({type: 'text'})
    permissions: Array<string>;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}