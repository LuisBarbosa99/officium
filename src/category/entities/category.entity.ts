import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from '../enums/type';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'cat_name' })
  name: string;

  @Column('int', { name: 'cat_type' })
  type: Type;
}
