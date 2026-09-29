import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { SignUpPayload } from './payload/sign-up.payload.js';
import { SignUpInput } from './dto/sign-up.input.js';
import { SignInInput } from './dto/sign-in.inputs.js';
import { UserWithoutPostsPayload } from '../posts/payload/user-without-posts.payload.js';
import { UseGuards } from '@nestjs/common';
import { IsAuthGuard } from '../shared/guards/isAuth.guard.js';
import { UserId } from '../users/decorators/user-id.decorator.js';
import { SignInPayload } from './payload/sign-in.payload.js';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpPayload)
  signUp(
    @Args("signUpInput") signUpInput: SignUpInput
  ){
    return this.authService.signUp(signUpInput)
  }

  @Mutation(() => SignInPayload)
  signIn(
    @Args("signInInput") signInInput: SignInInput
  ){
    return this.authService.signIn(signInInput)
  }

  @Query(() => UserWithoutPostsPayload)
  @UseGuards(IsAuthGuard)
  getCurrentUser(
    @UserId() userId: string
  ){
    return this.authService.getCurrentUser(userId)
  }
}
