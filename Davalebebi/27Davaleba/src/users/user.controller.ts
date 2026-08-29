import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpException, HttpStatus, Param, Patch, Post, Query, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { UserQueryDto } from "./dtos/user-query.dto";
import { IsValidMongoId } from "../common/is-valid-object-id.dto";
import { IsAuthGuard } from "../guards/is-auth.guard";
import { UserId } from "./decorators/user.decorator";
import { Throttle } from "@nestjs/throttler";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post("upgrade-subscription")
    @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
    @UseGuards(IsAuthGuard)
    upgradeSubscription(
        // @Headers("email") email: string
        @UserId() userId
    ){
        return this.userService.upgradeSubscription(userId)
    }

    @Get()
    getAllUsers(
        @Query() userQueryDto: UserQueryDto
    ){
        return this.userService.getAllUser(userQueryDto)
    }

    @Get(":id")
    getUserById(
        @Param() {id}: IsValidMongoId
    ){
        return this.userService.getUserById(id)
    }

    // @Post()
    // createUser(
    //     @Body() createUserDto: CreateUserDto
    // ){
    //     // if(
    //     //     !createUserDto.email ||
    //     //     !createUserDto.firstName ||
    //     //     !createUserDto.gender ||
    //     //     !createUserDto.lastName ||
    //     //     !createUserDto.phoneNumber
    //     // ){
    //     //     throw new HttpException("Fill in all the required fields: firstName, lastName, email, phoneNumber and gender", HttpStatus.BAD_REQUEST)
    //     // }
    //     return this.userService.createUser(createUserDto)
    // }

    @Delete(":id")
    @UseGuards(IsAuthGuard)
    deleteUserById(
        @Param() {id}: IsValidMongoId,
        @UserId() userId
    ){
        if(id !== userId){
            throw new ForbiddenException("No permission")
        }
        return this.userService.deleteUserById(id)
    }

    @Patch(":id")
    @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
    @UseGuards(IsAuthGuard)
    updateUserById(
        @Param() {id}: IsValidMongoId,
        @Body() updateUserDto: UpdateUserDto,
        @UserId() userId
    ){
        if(id !== userId){
            throw new ForbiddenException("No permission")
        }
        return this.userService.updateUserById(id, updateUserDto)
    }
}