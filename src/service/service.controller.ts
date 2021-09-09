import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FilterServiceDTO } from './dto/filter-service.dto';
import { Service } from './entities/service.entity';
import { ServiceDTO } from './dto/service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto): Promise<void> {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll(@Query() form : FilterServiceDTO): Promise<Service[]> {
    return this.serviceService.findAll(form);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ServiceDTO> {
    return await this.serviceService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
