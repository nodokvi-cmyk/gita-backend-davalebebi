import { Field, ObjectType } from "@nestjs/graphql";
import { UserWithoutPostsPayload } from "../../posts/payload/user-without-posts.payload.js";


@ObjectType()
export class SignUpPayload{

    @Field(() => String)
    accessToken!: string

    @Field(() => UserWithoutPostsPayload)
    user!: UserWithoutPostsPayload
}