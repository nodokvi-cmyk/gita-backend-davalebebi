import { Request, Response, Router, NextFunction } from "express"
import productService from "./product.service"
import isAdminMiddleware from "../middlewares/is-admin.middleware"
import { productDto, updateProductDto } from "./dto/product.dto"
import { ProductType } from "./product.model"
import { ObjectSchema } from "joi"

const productRouter = Router()

enum StatusCodes {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NO_PERMISSION = 403,
    NOT_FOUND = 404
}

const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details?.[0]?.message });
    }
    next();
};

productRouter.get("/", async (req: Request, res:Response) => {
    const products = await productService.getAllProducts()
    res.status(StatusCodes.SUCCESS).json(products)
})

productRouter.get("/:productId", async (req: Request, res:Response) => {
    const desiredProduct = await productService.getProductById(req.params.productId as string)
    if (!desiredProduct){
        return res.status(StatusCodes.NOT_FOUND).json({message: "Product not found"})
    }
    res.status(StatusCodes.SUCCESS).json(desiredProduct)
})

productRouter.post("/", isAdminMiddleware, validate(productDto), async (req: Request, res:Response) => {
    const newProduct = await productService.createProduct(req.body)
    res.status(StatusCodes.CREATED).json({created: true, data: newProduct})
})

productRouter.delete("/:productId", isAdminMiddleware, async (req: Request, res:Response) => {
    const deletedProduct = await productService.deleteProductById(req.params.productId as string)
    res.status(StatusCodes.SUCCESS).json({deleted: true, data: deletedProduct})
})

productRouter.put("/:productId", isAdminMiddleware, validate(updateProductDto), async (req: Request, res:Response) => {
    const updatedProduct = await productService.updateProductById(req.params.productId as string, req.body as ProductType)
    res.status(StatusCodes.SUCCESS).json({updated: true, data: updatedProduct})
})

export default productRouter