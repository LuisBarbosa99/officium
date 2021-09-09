import { Category } from "src/category/entities/category.entity";
import { CategoryType } from "src/category/enums/category-type";
import { User } from "src/users/users.entity";
import { ServiceProviderDTO } from "./service-provider.dto";

export class ServiceDTO {
    title: string;

    description: string;

    value: number;

    category: string;

    provider: ServiceProviderDTO;
}