import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../users/schema/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: userSchema}
    ])
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
