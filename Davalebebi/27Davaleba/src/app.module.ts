import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ExpenseModule } from './expenses/expense.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {ttl: 60 * 1000, limit: 30, blockDuration: 30 * 1000}
    ]),
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET")
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UserModule, 
    ExpenseModule, 
    ProductsModule, AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
