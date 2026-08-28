import { Transform } from "class-transformer"
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { UserGender } from "../schemas/user.schema"


export class QueryParamsDto {

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    page?: number = 1

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Max(10)
    take?: number = 10

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    age?: number

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    ageFrom?: number

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    ageTo?: number

    @IsOptional()
    @IsEnum(UserGender)
    gender?: UserGender

    @IsOptional()
    @IsString()
    name?: string
}