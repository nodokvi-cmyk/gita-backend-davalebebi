import { IsEnum, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import { PaginationDto } from "../../common/pagination.dto";
import { Transform } from "class-transformer";
import { KnownCategories } from "../enums/expense-category.enum";


export class ExpenseQueryDto extends PaginationDto {

    @IsOptional()
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase() : value))
    @IsString()
    @IsEnum(KnownCategories)
    category?: KnownCategories
    
    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    priceFrom?: number

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    priceTo?: number
}