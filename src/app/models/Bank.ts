import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    BeforeInsert,
    OneToOne,
    Double} from "typeorm";    

@Entity('BANK')
export class Bank {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', name: 'NAME'})
    name: string;

    @Column({type: 'varchar', name: 'LOGO'})
    logo: string;

    @Column({type: 'double', name: 'EMPRESTIMO_PESSOAL'})
    emprestimoPessoal: Double;

    @Column({type: 'double', name: 'CHEQUE_ESPECIAL'})
    chequeEspecial: Double;

    @CreateDateColumn({name: 'CREATED_AT'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'UPDATED_AT', nullable: true})
    updatedAt: Date;

    @BeforeInsert()
    private setDates() {
        this.createdAt = new Date(Date.now() - (1000*60*60*3));
    }
}