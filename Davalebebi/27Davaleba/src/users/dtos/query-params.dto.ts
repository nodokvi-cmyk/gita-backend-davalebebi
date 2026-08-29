import { Transform } from "class-transformer"
import { IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { PaginationDto } from "../../common/pagination.dto"

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
}
// export class UserQueryDto extends PaginationDto{

//     @IsOptional()
//     @IsString()
//     @Transform(({value}) => (typeof value === "string" ? value.toLowerCase() : value))
//     @IsIn(["m", "f"])
//     gender?: string

//     @IsOptional()
//     @IsString()
//     email?: string
// }