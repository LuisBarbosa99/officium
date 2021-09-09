import { Service } from 'src/service/entities/service.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn('int', {name: 'cat_id'})
  id: number;

  @Column('varchar', { name: 'cat_name' })
  name: string;

  @OneToMany(()=> Service, service => service.category)
  services: Service[];
}
