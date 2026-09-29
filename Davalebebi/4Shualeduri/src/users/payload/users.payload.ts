import { Field, ID, ObjectType } from "@nestjs/graphql"
import { PostPayload } from "../../posts/payload/post.payload.js"
import { PostsWithoutAuthorPayload } from "./posts-without-author.payload.js"

@ObjectType()
export class UserPayload{
    @Field(() => ID)
    _id!: string

    @Field(() => String)
    fullName!: string

    @Field(() => String)
    email!: string

    @Field(() => [PostsWithoutAuthorPayload])
    posts!: PostsWithoutAuthorPayload[]
}