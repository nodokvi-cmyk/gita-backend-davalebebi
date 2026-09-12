import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schema/product.schema';
import { UserService } from '../users/user.service';
import path from 'path';
import { randomUUID } from 'crypto';
import * as mime from "mime-types"
import { AwsS3Service } from '../aws-s3/aws-s3.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("product") private productModel: Model<Product>,
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private awsS3Service: AwsS3Service
  ){}

  async removeProductsAfterUserDeleted(buyerId: string | Types.ObjectId){
    await this.productModel.deleteMany({buyer: buyerId})
  }

  async create(createProductDto: CreateProductDto, userId, files: Array<Express.Multer.File>) {
    const uploadedPhotoUrls: string[] = []

    for (let file of files){
      const ext = path.extname(file.originalname)
      const fileId = `productPhotos/${randomUUID()}${ext}`
      const fixedMimeType = mime.lookup(file.originalname || file.mimetype)
      
      await this.awsS3Service.uploadFile(fileId, file.buffer, fixedMimeType)
      const cloudFrontUri = `${process.env.CLOUDFRONT_DOMAIN_NAME}/${fileId}`
      uploadedPhotoUrls.push(cloudFrontUri)
    }

    const newProduct = await this.productModel.create({
      ...createProductDto,
      totalPrice: createProductDto.price * createProductDto.quantity,
      // buyer: userId,
      photos: uploadedPhotoUrls
    })

    // await this.usersService.addProductToUser(newProduct.buyer, newProduct._id)
    return newProduct
  }

  async deleteSinglePhoto(productId: string, photoUrl: string) {
    const product = await this.productModel.findById(productId)
    if (!product) {
        throw new NotFoundException('Product not found')
    }

    const fullPhotoUrl = product.photos.find(url => url.includes(photoUrl))

    if (!fullPhotoUrl){
        throw new NotFoundException('Photo not found in this product')
    }

    const productPhotosIndex = fullPhotoUrl.indexOf('productPhotos/');
    const fileId = productPhotosIndex !== -1 ? fullPhotoUrl.substring(productPhotosIndex) : fullPhotoUrl

    await this.awsS3Service.deleteFile(fileId)

    product.photos = product.photos.filter(url => url !== fullPhotoUrl)
    await product.save()

    return product
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

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const targettedProduct = await this.productModel.findById(id)
    if(!targettedProduct){
      throw new NotFoundException("Product not found")
    }

    // if(targettedProduct.buyer.toString() !== userId){
    //   throw new ForbiddenException("No permission")
    // }

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

  async remove(id: string, userId: string) {
    const product = await this.productModel.findById(id)

    if(!product){
      throw new NotFoundException("Product not found")
    }

    // if(product.buyer.toString() !== userId){
    //   throw new ForbiddenException("No permission")
    // }

    if (product.photos && product.photos.length > 0) {
      for (const photoUrl of product.photos) {
        const fileId = photoUrl.replace(`${process.env.CLOUDFRONT_DOMAIN_NAME}/`, '')
        await this.awsS3Service.deleteFile(fileId)
      }
    }

    const deletedProduct = await this.productModel.findByIdAndDelete(id)

    // await this.usersService.removeProductFromUser(product.buyer, product._id)

    return product
  }
}
