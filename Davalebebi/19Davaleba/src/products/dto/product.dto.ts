import Joi from "joi"

export const productDto = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    photo: Joi.string().uri().required(),
    category: Joi.string().required()
})

export const updateProductDto = productDto.fork( ['name', 'description', 'price', 'photo', 'category'], (schema) => schema.optional() );
