import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryType } from 'src/category/enums/category-type';
import { CreateServiceDto } from './dto/create-service.dto';
import { FilterServiceDTO } from './dto/filter-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly categoryRepository: CategoryRepository, private serviceRepository: ServiceRepository){}
  async create(model: CreateServiceDto): Promise<void> {
    var service = new Service();
    service.title = model.title;
    service.description = model.description;
    service.value = model.value;
    service.category = CategoryType[model.categoryType];

    await this.serviceRepository.save(service);
  }

  async findAll(filter: FilterServiceDTO): Promise<Service[]> {
    return this.serviceRepository.findByFilter(filter);
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
