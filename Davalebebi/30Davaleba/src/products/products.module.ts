import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from '../users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { AwsS3Module } from '../aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "product", schema: productSchema}
    ]),
    forwardRef(() => UserModule),
    AwsS3Module
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
