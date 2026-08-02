import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ExpenseModule } from './expenses/expense.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UserModule, 
    ExpenseModule, 
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
