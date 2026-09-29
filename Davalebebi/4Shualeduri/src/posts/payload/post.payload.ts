import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserPayload } from "../../users/payload/users.payload.js";
import { UserWithoutPostsPayload } from "./user-without-posts.payload.js";

@ObjectType()
export class PostPayload{

    @Field(() => ID)
    _id!: string

    @Field(() => String)
    title!: string

    @Field(() => String)
    desc!: string

    @Field(() => UserWithoutPostsPayload)
    author!: UserWithoutPostsPayload
}