import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

@InputType()
export class UpdateUserInput{

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsString()
    fullName?: string

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsEmail()
    email?: string

    @Field(() => String, {nullable: true})
    @Length(6, 25)
    @IsString()
    @IsOptional()
    password?: string
}