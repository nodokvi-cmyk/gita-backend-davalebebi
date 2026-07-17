import productModel, { ProductType } from "./product.model";

const getAllProducts = async (): Promise<ProductType[]> => {
    const products = await productModel.find()
    return products
}

const getProductById = async (id: string): Promise<ProductType | null> => {
    const desiredProduct = await productModel.findById(id)
    return desiredProduct
}

const createProduct = async (body: ProductType) => {
    const newProduct = await productModel.create(body)
    return newProduct
}

const deleteProductById = async (id: string) => {
    const deletedProduct = await productModel.findByIdAndDelete(id)
    return deletedProduct
}

const updateProductById = async (id:string, body: ProductType) => {
    const updatedProduct = await productModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {new: true})
    return updatedProduct
}

export default {getAllProducts, getProductById, createProduct, deleteProductById, updateProductById}