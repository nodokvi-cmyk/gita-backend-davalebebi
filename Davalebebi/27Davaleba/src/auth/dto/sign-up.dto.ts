import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from "class-validator"


export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    firstName!: string
    
    @IsNotEmpty()
    @IsString()
    lastName!: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    password!: string

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["m", "f"])
    gender!: string
}