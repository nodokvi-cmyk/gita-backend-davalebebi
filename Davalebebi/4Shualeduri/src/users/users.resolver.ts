import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service.js';
import { UserPayload } from './payload/users.payload.js';
import { ValidMongoId } from '../shared/dto/valid-mongodb-id.inputs.js';

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ){}

    @Query(() => [UserPayload])
    findAllUsers(){
        return this.usersService.getAll()
    }

    // @Mutation(() => UserPayload)
    // createUser(
    //     @Args("CreateUserInput") createUserInput: CreateUserInput
    // ){
    //     return this.usersService.createUser(createUserInput)
    // }

    @Mutation(() => UserPayload)
    removeUser(
        @Args() {id}: ValidMongoId
    ){
        return this.usersService.removeUser(id)
    }
}
