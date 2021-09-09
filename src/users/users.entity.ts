import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  
  import * as bcrypt from 'bcryptjs';
import { Service } from 'src/service/entities/service.entity';
  
  @Entity()
  @Unique(['email'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    salt: string;

    @Column()
    type: number;

    @Column()
    phone: string;
    
    @OneToMany(()=> Service, service => service.provider)
    services: Service[];
  
    async validatePassword(password: string): Promise<boolean> {
      const hash = await bcrypt.hash(password, this.salt);
      return hash === this.password;
    }
  }
  