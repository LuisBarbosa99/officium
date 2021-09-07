import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    
    private finder = getConnection().createQueryBuilder().select("category").from(Category, "category");

    async findOneByType(type: number): Promise<Category> {
        return await this.finder
            .where("category.type = :type")
            .setParameters({type: type})
            .getOneOrFail();
    }

    async findAll(): Promise<Category[]> {
        return await this.finder.getMany();       
    }
}