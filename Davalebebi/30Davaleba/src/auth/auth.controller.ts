import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from '../guards/is-auth.guard';
import { UserId } from '../users/decorators/user.decorator';
import { Throttle } from '@nestjs/throttler';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
  signUp(
    @Body() signUpDto: SignUpDto
  ){
    return this.authService.signUp(signUpDto)
  }

  @Post("sign-in")
  @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
  signIn(
    @Body() signInDto: SignInDto
  ){
    return this.authService.signIn(signInDto)
  }

  @Post("verify-user")
  @HttpCode(200)
  verifyUser(
    @Body() verifyUserDto: VerifyUserDto
  ){
    return this.authService.verifyUser(verifyUserDto)
  }

  @Post("resend-verification")
  @HttpCode(200)
  resendVerification(
    @Body() resendVerificationDto: ResendVerificationDto
  ){
    return this.authService.resendVerification(resendVerificationDto)
  }

  @Get("current-user")
  @UseGuards(IsAuthGuard)
  getCurrentUser(
    @UserId() userId
  ){
    return this.authService.getCurrentUser(userId)
  }
}
