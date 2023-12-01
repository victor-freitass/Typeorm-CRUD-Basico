import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('contents')
export class Content {     
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 500, nullable: false })
    content: string;

    @Column('varchar', { length: 100 }) 
    imageUrl: string;

}
