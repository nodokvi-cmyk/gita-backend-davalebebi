import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserGender } from "../schemas/user.schema";
import { Transform } from "class-transformer";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName!: string

    @IsNotEmpty()
    @IsString()
    lastName!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsEnum(UserGender)
    gender!: UserGender

    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    age!: number
}