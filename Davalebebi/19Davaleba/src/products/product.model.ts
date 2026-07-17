import mongoose from "mongoose";

export type ProductType = {
    _id?: string,
    name: string,
    description: string,
    price: number,
    photo: string,
    category: string,
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model<ProductType>("product", productSchema)
export default productModel