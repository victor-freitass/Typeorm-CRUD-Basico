import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('adms')
export class Adm {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 100, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false})
    password: string
}