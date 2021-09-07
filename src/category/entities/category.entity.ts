import { Service } from 'src/service/entities/service.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'cat_name' })
  name: string;

  @Column('int', { name: 'cat_type' })
  type: number;

  @OneToMany(()=> Service, service => service.category)
  services: Service[];
}
