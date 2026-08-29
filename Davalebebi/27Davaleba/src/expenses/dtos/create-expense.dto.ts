import { Transform } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { KnownCategories } from "../enums/expense-category.enum"


export class CreateExpenseDto {

    @IsNotEmpty()
    @IsString()
    @IsEnum(KnownCategories)
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase(): value))
    category!: KnownCategories

    @IsNotEmpty()
    @IsString()
    productName!: string

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    @Transform(({value}) => Number(value))
    quantity!: number

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    @Transform(({value}) => Number(value))
    price!: number
}