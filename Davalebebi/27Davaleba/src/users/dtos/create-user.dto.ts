import { Transform } from "class-transformer"
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName!: string
    
    @IsNotEmpty()
    @IsString()
    lastName!: string

    @IsNotEmpty()
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase() : value))
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => (typeof value === "string" ? value.toLowerCase() : value))
    @IsIn(["m", "f"])
    gender!: string

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    age!: number

}