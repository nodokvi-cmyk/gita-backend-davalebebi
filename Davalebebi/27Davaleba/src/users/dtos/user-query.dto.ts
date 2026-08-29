import { Transform } from "class-transformer"
import { IsIn, IsOptional, IsString } from "class-validator"
import { PaginationDto } from "../../common/pagination.dto"


export class UserQueryDto extends PaginationDto{

    @IsOptional()
    @IsString()
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase() : value))
    @IsIn(["m", "f"])
    gender?: string

    @IsOptional()
    @IsString()
    email?: string
}