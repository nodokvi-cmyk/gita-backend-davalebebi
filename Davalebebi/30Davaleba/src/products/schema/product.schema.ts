import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({
    timestamps: true
})
export class Product {
    @Prop({
        type: Number,
        required: true
    })
    price!: number

    @Prop({
        type: String,
        required: true
    })
    name!: string

    @Prop({
        type: String,
        required: true,
        lowercase: true
    })
    category!: string

    @Prop({
        type: String,
        required: true
    })
    description!: string

    @Prop({
        type: Number,
        required: true
    })
    quantity!: number

    @Prop({
        type: Number,
        required: true
    })
    totalPrice!: number

    @Prop({
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    })
    buyer!: Types.ObjectId
}

export const productSchema = SchemaFactory.createForClass(Product)