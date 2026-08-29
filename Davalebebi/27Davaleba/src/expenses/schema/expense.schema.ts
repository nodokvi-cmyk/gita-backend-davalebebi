import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Expense{
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
}

export const expenseSchema = SchemaFactory.createForClass(Expense)