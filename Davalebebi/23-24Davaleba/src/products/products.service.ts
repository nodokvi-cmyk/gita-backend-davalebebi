import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schema/product.schema';
import { UserService } from '../users/user.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("product") private productModel: Model<Product>,
    @Inject(forwardRef(() => UserService))
    private usersService: UserService
  ){}

  async removeProductsAfterUserDeleted(buyerId: string | Types.ObjectId){
    await this.productModel.deleteMany({buyer: buyerId})
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productModel.create({
      ...createProductDto,
      totalPrice: createProductDto.price * createProductDto.quantity
    })

    await this.usersService.addProductToUser(createProductDto.buyer, newProduct._id)
    return newProduct
  }

  async findAll(hasSubscription: boolean) {
    const products = await this.productModel.find()
    
    if(hasSubscription === true){
      return products.map((p) => ({
        ...p,
        price: (p.price * 75) / 100
      }))
    }

    return products
  }

  async findOne(id: string, hasSubscription: boolean) {
    const product = await this.productModel.findById(id).populate({path: "buyer", select: "firstName lastName email -_id"})

    if(!product){
      throw new NotFoundException("Productn ot found")
    }

    if(hasSubscription){
      return {
        ...product,
        price: (product.price * 75) / 100
      }
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const targettedProduct = await this.productModel.findById(id)
    if(!targettedProduct){
      throw new NotFoundException("Product not found")
    }

    const price = updateProductDto.price ?? targettedProduct.price
    const quantity = updateProductDto.quantity ?? targettedProduct.quantity
    const totalPrice = price * quantity

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
      ...updateProductDto, 
      totalPrice,
      $inc: { __v: 1 }
    },
    {new: true})
    return updatedProduct
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id)

    if(!product){
      throw new NotFoundException("Product not found")
    }

    await this.usersService.removeProductFromUser(product.buyer, product._id)

    return product
  }
}
