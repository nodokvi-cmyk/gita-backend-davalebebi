import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


@InputType()
export class SignUpInput{

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    fullName!: string

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email!: string

    @Field(() => String)
    @Length(6, 25)
    @IsNotEmpty()
    @IsString()
    password!: string
}