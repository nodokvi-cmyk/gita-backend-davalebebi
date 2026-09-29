import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import {GraphQLModule} from "@nestjs/graphql"
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import {JwtModule} from "@nestjs/jwt"
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET")
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/schema.gql"
    }),
    UsersModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
