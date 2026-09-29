import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Post } from "../../posts/schema/post.schema.js";

@Schema()
export class User{

    @Prop({
        type: String,
        required: true
    })
    fullName!: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        unique: true
    })
    email!: string

    @Prop({
        type: String,
        required: true,
        select: false
    })
    password!: string

    @Prop({
        type: [SchemaTypes.ObjectId],
        ref: "Post",
        default: []
    })
    posts!: Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)