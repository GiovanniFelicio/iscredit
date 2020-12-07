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
        this.createdAt = new Date(Date.now() - (1000*60*60*3));
    }
}

//https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/auth?response_type=code&client_id=PSDBR-NCA-ISCREDIT&redirect_uri=https://developer.obiebank.banfico.com/callback&state=1531373357552&nonce=1151092814432&request=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dGgub2JpZWJhbmsuYmFuZmljby5jb20iLCJpc3MiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJjbGllbnRfaWQiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJyZWRpcmVjdF91cmkiOiJodHRwOi8vZ2lvdmFubmkuc21hcnRici5jb206MzAwMC9jb25zZW50L3JldHVybiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWNjb3VudHMiLCJzdGF0ZSI6Ijg4OGUwNGQwLTM4MmItMTFlYi04MjEzLTY5MmIxNzcwN2Q4NSIsIm5vbmNlIjoiODg4ZTA0ZDEtMzgyYi0xMWViLTgyMTMtNjkyYjE3NzA3ZDg1IiwiZXhwIjoxNjA3MzA4MTE5LCJyZXNwb25zZV90eXBlIjoiY29kZSBpZF90b2tlbiIsImNsYWltcyI6eyJ1c2VyaW5mbyI6eyJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiJ1cm46b2JpZWJhbms6YWNjb3VudHM6MmNmM2IwMTItYTJmMy00Y2M5LTk0NDYtMzFiNTJjNmE5YmMzIiwiZXNzZW50aWFsIjp0cnVlfX0sImlkX3Rva2VuIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6InVybjpvYmllYmFuazphY2NvdW50czoyY2YzYjAxMi1hMmYzLTRjYzktOTQ0Ni0zMWI1MmM2YTliYzMiLCJlc3NlbnRpYWwiOnRydWV9LCJhY3IiOnsiZXNzZW50aWFsIjp0cnVlLCJ2YWx1ZXMiOlsidXJuOm9wZW5iYW5raW5nOnBzZDI6c2NhIiwidXJuOm9wZW5iYW5raW5nOnBzZDI6Y2EiXX19fSwiaWF0IjoxNjA3MzA0NTE5fQ.cbqy7CidQbxXKW8XYOwxtPIWPpKKEnJx5Rpatvo1EIlEXoMBeBGhmD3mrThaJMmBR-VooZBtwSSObiudDYVLW65GAkMkexS4xjIMuUWOn0X3_MtpuqvUOHp66NKhlPNfXGCQ29RphNGt9VZeEN9bMHZMaJMZtDroufHav-DrS1zpyfPSewoEviCdayTPHMshnPe4zDzz2AsaNGiaY2Qb7925g3lkgMVzCFLcIqBO4FDDBrxRVlLL25NfR815ENArDSuP-HIDouJBKNz-QHZhWVVxHq_jRXJ3MG_izNNf1jBHwlXxm1RzTANeogxsx7dbfbyK2clM7eVdlMWaj9qv2w
//eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4NjQ1OGFjYi0wYjQ0LTRmYjItODA3Yi1mZGFjOTI1OTFkYTEifQ.eyJpYXQiOjE2MDcyOTA0NDgsImp0aSI6IjA4ZDI0NjFjLTY2NTktNDZmNy05MmM5LTkxNDY3Y2QzZGY3ZCIsImlzcyI6Imh0dHBzOi8vYXV0aC5vYmllYmFuay5iYW5maWNvLmNvbS9hdXRoL3JlYWxtcy9wcm92aWRlciIsImF1ZCI6Imh0dHBzOi8vYXV0aC5vYmllYmFuay5iYW5maWNvLmNvbS9hdXRoL3JlYWxtcy9wcm92aWRlciIsInN1YiI6ImE1Y2YxY2FiLTM5ZDAtNDQyMi1iM2U0LWZhMGVhZWVlZTE2YiIsInR5cCI6Ik9mZmxpbmUiLCJhenAiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJzZXNzaW9uX3N0YXRlIjoiMjFiOTRkNTUtMmRhOC00N2VkLWI5YWMtYWU0ZDEzZjJiYzYxIiwic2NvcGUiOiJhY2NvdW50cyBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIGVtYWlsIn0.ZSt9qf-A6joMgduEVYIG85--HDo-yQAj4YBTkPeKpb8

//https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/auth?response_type=code&client_id=PSDBR-NCA-ISCREDIT&redirect_uri=http://giovanni.smartbr.com:3000/returnconsent&state=1531373357552&nonce=1151092814432&request=