import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { KnownCategories } from "../enums/expense-category.enum";


@Schema({
    timestamps: true
})
export class Expense{
    @Prop({
        type: String,
        enum: KnownCategories,
        required: true
    })
    category!: KnownCategories

    @Prop({
        type: String,
        required: true
    })
    productName!: string

    @Prop({
        type: Number,
        required: true
    })
    quantity!: number

    @Prop({
        type: Number,
        required: true
    })
    price!: number

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
    spender!: Types.ObjectId
}

export const expenseSchema = SchemaFactory.createForClass(Expense)