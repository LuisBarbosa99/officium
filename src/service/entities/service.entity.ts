import { Category } from "src/category/entities/category.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {name: 'ser_title'})
    title: string;

    @Column('varchar', {name: 'ser_description'})
    description: string;

    @Column('int', {name: 'ser_value'})
    value: number;

    @ManyToOne(() => Category, category => category.services)
    @JoinColumn({ name: "ser_category" })
    category: Category;

}
