import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service.js';
import { UserPayload } from './payload/users.payload.js';
import { ValidMongoId } from '../shared/dto/valid-mongodb-id.inputs.js';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { IsAuthGuard } from '../shared/guards/isAuth.guard.js';
import { UserId } from './decorators/user-id.decorator.js';
import { UpdateUserInput } from './dto/update-user.input.js';

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ){}

    @Query(() => [UserPayload])
    findAllUsers(){
        return this.usersService.getAll()
    }

    @Query(() => UserPayload)
    findOneUser(
        @Args() {id}: ValidMongoId
    ){
        return this.usersService.getOne(id)
    }

    @Mutation(() => UserPayload)
    @UseGuards(IsAuthGuard)
    updateUser(
        @UserId() userId: string,
        @Args() {id}: ValidMongoId,
        @Args("updateUserInput") updateUserInput: UpdateUserInput
    ){
        if(userId !== id) throw new ForbiddenException("No permission")
        return this.usersService.updateUser(userId, updateUserInput)
    }

    @Mutation(() => UserPayload)
    @UseGuards(IsAuthGuard)
    removeUser(
        @UserId() userId: string,
        @Args() {id}: ValidMongoId
    ){
        if(userId !== id) throw new ForbiddenException("No permission")
        return this.usersService.removeUser(id)
    }
}
