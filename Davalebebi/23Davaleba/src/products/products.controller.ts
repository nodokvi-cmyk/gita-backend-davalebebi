import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HasSubscriptionByEmail } from '../guards/has-subscription.guard';
import { type Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(HasSubscriptionByEmail)
  findAll(
    @Req() req: Request
  ) {
    const hasSubscription = req["hasSubscription"]

    return this.productsService.findAll(hasSubscription);
  }

  @Get(':id')
  @UseGuards(HasSubscriptionByEmail)
  findOne(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const hasSubscription = req["hasSubscription"]
    return this.productsService.findOne(+id, hasSubscription);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
