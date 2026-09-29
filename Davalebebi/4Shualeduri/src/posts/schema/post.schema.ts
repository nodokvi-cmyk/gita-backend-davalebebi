import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { User } from "../../users/schema/user.schema.js";

@Schema()
export class Post {

    @Prop({
        type: String,
        required: true
    })
    title!: string

    @Prop({
        type: String,
        required: true
    })
    desc!: string

    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    })
    author!: Types.ObjectId
}

export const postSchema = SchemaFactory.createForClass(Post)