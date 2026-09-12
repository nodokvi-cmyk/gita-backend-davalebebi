import { Transform } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    price!: number

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    category!: string

    @IsNotEmpty()
    @IsString()
    description!: string

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    quantity!: number

    // @IsNotEmpty()
    // @IsMongoId()
    // buyer!: string
}
