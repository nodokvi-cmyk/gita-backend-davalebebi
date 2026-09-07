import { Transform } from "class-transformer"
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator"


export class PaginationAndFilterDto {
    @IsOptional()
    @Min(1)
    @IsNumber()
    @Transform(({value}) => Number(value))
    page?: number = 1

    @IsOptional()
    @Max(30)
    @Min(1)
    @IsNumber()
    @Transform(({value}) => Number(value))
    take?: number = 30

    @IsOptional()
    @Min(1)
    @IsNumber()
    @Transform(({value}) => Number(value))
    yearFrom?: number

    @IsOptional()
    @Min(1)
    @IsNumber()
    @Transform(({value}) => Number(value))
    yearTo?: number
    

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    genre?: string
}