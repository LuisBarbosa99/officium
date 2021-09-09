import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryType } from 'src/category/enums/category-type';
import { UserRepository } from 'src/users/users.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { FilterServiceDTO } from './dto/filter-service.dto';
import { ServiceProviderDTO } from './dto/service-provider.dto';
import { ServiceDTO } from './dto/service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(
    private readonly categoryRepository: CategoryRepository, 
    private readonly userRepository : UserRepository, 
    private serviceRepository: ServiceRepository){}
  async create(model: CreateServiceDto): Promise<void> {
    var provider = await this.userRepository.findOne(model.userId);

    console.log('provider', provider);
    
    if (!provider) {
      throw new NotFoundException("Provedor de serviços não encontrado");
    }

    var service = new Service();
    service.title = model.title;
    service.description = model.description;
    service.value = model.value;
    service.category = CategoryType[model.categoryType];
    service.provider = provider;

    await this.serviceRepository.save(service);
  }

  async findAll(filter: FilterServiceDTO): Promise<Service[]> {
    return await this.serviceRepository.findByFilter(filter);
  }

  async findAllByProvider(id: number): Promise<Service[]> {
    return await this.serviceRepository.findByProviderId(id);
  }

  async findOne(id: number): Promise<ServiceDTO> {
    var service = await this.serviceRepository.findOne(id);
    var user = await this.userRepository.findOne(service.provider);
    var serviceProvider = new ServiceProviderDTO();
    var category = await this.categoryRepository.findOne(service.category);
    serviceProvider.name = user.name;
    serviceProvider.email = user.email;
    serviceProvider.type = user.type;
    serviceProvider.phone = user.phone;

    var dto = new ServiceDTO();
    dto.title = service.title;
    dto.value = service.value;
    dto.description = service.description;
    dto.category = category.name;
    dto.provider = serviceProvider;
    
    return dto;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
