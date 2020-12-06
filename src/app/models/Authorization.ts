import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    BeforeInsert,
    OneToOne} from "typeorm";
    
import { User } from "./User";

@Entity('AUTHORIZATION')
export class Authorization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'clob', name: 'access_token'})
    accessToken: string;

    @OneToOne(type => User, user => user.authorizationToken)
    user: User;

    @CreateDateColumn({name: 'expire_at'})
    expireAt: Date;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true})
    updatedAt: Date;

    @BeforeInsert()
    private setDates() {
        if (typeof(this.expireAt) == undefined) {
            this.expireAt = new Date(Date.now() + (1000*60*5))
        }
        this.createdAt = new Date();
    }
}