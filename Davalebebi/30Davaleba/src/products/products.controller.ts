import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { HasSubscriptionByEmail } from '../guards/has-subscription.guard';
import { type Request } from 'express';
import { IsValidMongoId } from '../common/is-valid-object-id.dto';
import { IsAuthGuard } from '../guards/is-auth.guard';
import { UserId } from '../users/decorators/user.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(IsAuthGuard)
  @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
  create(
    @Body() createProductDto: CreateProductDto,
    @UserId() userId
  ) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  // @UseGuards(HasSubscriptionByEmail)
  findAll(
    @Req() req: Request
  ) {
    const hasSubscription = req["hasSubscription"]

    return this.productsService.findAll(hasSubscription);
  }

  @Get(':id')
  // @UseGuards(HasSubscriptionByEmail)
  findOne(
    @Param() {id}: IsValidMongoId,
    @Req() req: Request
  ) {
    const hasSubscription = req["hasSubscription"]
    return this.productsService.findOne(id, hasSubscription);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
  update(@Param() {id}: IsValidMongoId, @Body() updateProductDto: UpdateProductDto, @UserId() userId) {
    return this.productsService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  remove(
    @Param() {id}: IsValidMongoId,
    @UserId() userId
  ) {
    return this.productsService.remove(id, userId);
  }
}
