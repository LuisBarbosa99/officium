import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { ServiceRepository } from './service.repository';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryRepository, ServiceRepository])],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
