import { Transform } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { KnownCategories } from "../enums/expense-category.enum"


export class CreateExpenseDto {

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase(): value))
    @IsEnum(KnownCategories)
    category!: KnownCategories

    @IsNotEmpty()
    @IsString()
    productName!: string

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    quantity!: number

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @IsPositive()
    price!: number
}