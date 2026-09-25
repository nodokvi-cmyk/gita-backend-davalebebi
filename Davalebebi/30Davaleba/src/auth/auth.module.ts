import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../users/schema/user.schema';
import { EmailSenderModule } from '../email-sender/email-sender.module';

@Module({
  imports: [
        MongooseModule.forFeature([
          {name: "user", schema: userSchema}
        ]),
        EmailSenderModule
      ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
