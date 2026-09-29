import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";

@ArgsType()
export class ValidMongoId {
    @Field(() => ID)
    @IsNotEmpty()
    @IsMongoId()
    id!: string
}