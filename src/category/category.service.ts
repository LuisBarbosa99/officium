import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryType } from './enums/category-type';
@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository){}
  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    var category = Category.create();
    category.name = createCategoryDto.name;
    category.type = CategoryType[createCategoryDto.type];

    await this.categoryRepository.save(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
