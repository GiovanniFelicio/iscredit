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

    @Column({type: 'varchar', length: 80})
    expirationDateTime: string;
    
    @Column({type: 'varchar', length: 80})
    Permissions: Array<string>;

    @Column({type: 'varchar', length: 80})
    transactionFromDateTime: string;

    @Column({type: 'varchar', length: 80})
    transactionToDateTime: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

`
{
    "Data": {
      "ExpirationDateTime": "2019-05-20T11:12:49.333Z",
      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadBeneficiariesDetail",
        "ReadDirectDebits",
        "ReadProducts",
        "ReadStandingOrdersDetail",
        "ReadTransactionsCredits",
        "ReadTransactionsDebits",
        "ReadTransactionsDetail",
        "ReadOffers",
        "ReadPAN",
        "ReadParty",
        "ReadPartyPSU",
        "ReadScheduledPaymentsDetail",
        "ReadStatementsDetail"
      ],
      "TransactionFromDateTime": "2019-02-20T11:12:49.333Z",
      "TransactionToDateTime": "2019-02-20T11:12:49.333Z"
    },
    "Risk": {}
  }
  
`