import { CategoryType } from "src/category/enums/category-type";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { FilterServiceDTO } from "./dto/filter-service.dto";
import { Service } from "./entities/service.entity";

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {

    async findByFilter(filter:FilterServiceDTO): Promise<Service[]> {
        const where = getConnection().createQueryBuilder().select("service").from(Service, "service");
        
        if (filter.title) {
            where.andWhere("service.title ilike :title")
            .setParameters({'title': `%${filter.title}%`})
        }

        if(filter.category) {
            where.andWhere("service.category = :category")
            .setParameters({"category": CategoryType[filter.category]})
        }
        return where.getMany();
    }

    async findByProviderId(id: number): Promise<Service[]> {
        return await getConnection()
        .createQueryBuilder()
        .select("service")
        .from(Service, "service")
        .where("service.provider = :id")
        .setParameters({"id": id})
        .getMany();
    }
}