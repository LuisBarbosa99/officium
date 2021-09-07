import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() form : CreateCategoryDto): Promise<void> {
    return this.categoryService.create(form);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:type')
  findOne(@Param('type') type: string): Promise<Category> {
    return this.categoryService.findOne(type);
  }
}
