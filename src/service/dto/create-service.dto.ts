import { IsNotEmpty } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    categoryType: string;

    @IsNotEmpty()
    userId: number;
}
