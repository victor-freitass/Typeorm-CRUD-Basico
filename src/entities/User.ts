import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class User {     
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 100, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false})
    password: string
}
