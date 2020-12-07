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

//https://auth.obiebank.banfico.com/auth/realms/provider/protocol/openid-connect/auth?response_type=code&client_id=PSDBR-NCA-ISCREDIT&redirect_uri=https://developer.obiebank.banfico.com/callback&state=1531373357552&nonce=1151092814432&request=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2F1dGgub2JpZWJhbmsuYmFuZmljby5jb20vYXV0aC9yZWFsbXMvcHJvdmlkZXIiLCJpc3MiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJjbGllbnRfaWQiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2RldmVsb3Blci5vYmllYmFuay5iYW5maWNvLmNvbS9jYWxsYmFjayIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWNjb3VudHMiLCJzdGF0ZSI6MTUzMTI3MzM1NzU1Miwibm9uY2UiOjEwNTEwOTI4MTQ0MzIsImV4cCI6MTYwNzI5MTU4MCwicmVzcG9uc2VfdHlwZSI6ImNvZGUgaWRfdG9rZW4iLCJjbGFpbXMiOnsidXNlcmluZm8iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoidXJuOm9iaWViYW5rOmFjY291bnRzOmMzODE5OWFkLTRmNzEtNDljZi1hZjE4LWJmY2VjZGE0ZWNjYyIsImVzc2VudGlhbCI6dHJ1ZX19LCJpZF90b2tlbiI6eyJvcGVuYmFua2luZ19pbnRlbnRfaWQiOnsidmFsdWUiOiJ1cm46b2JpZWJhbms6YWNjb3VudHM6YzM4MTk5YWQtNGY3MS00OWNmLWFmMTgtYmZjZWNkYTRlY2NjIiwiZXNzZW50aWFsIjp0cnVlfSwiYWNyIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWVzIjpbInVybjpvcGVuYmFua2luZzpwc2QyOnNjYSIsInVybjpvcGVuYmFua2luZzpwc2QyOmNhIl19fX0sImlhdCI6MTYwNzI4Nzk4MH0.L7wmbqwkKyeWaddX2DKWVdrXZHcj2LL-kHqrZKxcDwKLFFijeBGVdmamXEcZw7vOX_cYlpt8Uhqr-L5yNExdeDiLXLJrJ3xm2JSEfrR1BRPrrTFTGCe4zCNzzcCLmFv_vHbJLSV3VP2zRMLOJMcH6eH99GLVUqS3ccQ5-Zpr151955yT4Sqco2QzlgqbLvZdw9RCaVyjW-3-tCaSfi6asj0XjCLiKT3GSFWGViXxerF2cUuiiilsL9pk51MqdJeIUfW1c-yP6YVc9owJRxUu1pu-5wBGRuUCVQkCwvJ7bUm0_3SjqjrARYUR7a76ySyESQ_lCOJlYKK_EQEFR1HdZQ
//eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4NjQ1OGFjYi0wYjQ0LTRmYjItODA3Yi1mZGFjOTI1OTFkYTEifQ.eyJpYXQiOjE2MDcyOTA0NDgsImp0aSI6IjA4ZDI0NjFjLTY2NTktNDZmNy05MmM5LTkxNDY3Y2QzZGY3ZCIsImlzcyI6Imh0dHBzOi8vYXV0aC5vYmllYmFuay5iYW5maWNvLmNvbS9hdXRoL3JlYWxtcy9wcm92aWRlciIsImF1ZCI6Imh0dHBzOi8vYXV0aC5vYmllYmFuay5iYW5maWNvLmNvbS9hdXRoL3JlYWxtcy9wcm92aWRlciIsInN1YiI6ImE1Y2YxY2FiLTM5ZDAtNDQyMi1iM2U0LWZhMGVhZWVlZTE2YiIsInR5cCI6Ik9mZmxpbmUiLCJhenAiOiJQU0RCUi1OQ0EtSVNDUkVESVQiLCJzZXNzaW9uX3N0YXRlIjoiMjFiOTRkNTUtMmRhOC00N2VkLWI5YWMtYWU0ZDEzZjJiYzYxIiwic2NvcGUiOiJhY2NvdW50cyBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIGVtYWlsIn0.ZSt9qf-A6joMgduEVYIG85--HDo-yQAj4YBTkPeKpb8