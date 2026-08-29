import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({
    timestamps: true
})
export class User {
    @Prop({
        type: String,
        required: true
    })
    firstName!: string
    
    @Prop({
        type: String,
        required: true
    })
    lastName!: string

    @Prop({
        type: String,
        required: true,
        unique: true,
        lowercase: true
    })
    email!: string

    @Prop({
        type: String,
        required: true,
        select: false
    })
    password!: string

    @Prop({
        type: String,
        required: true
    })
    phoneNumber!: string

    @Prop({
        type: String,
        required: true
    })
    gender!: string

    @Prop({
        type: Date,
        required: true
    })
    subscriptionStartDate!: Date

    @Prop({
        type: Date,
        required: true
    })
    subscriptionEndDate!: Date

    @Prop({
        type: [SchemaTypes.ObjectId],
        ref: "product",
        default: []
    })
    orderedProducts!: Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)