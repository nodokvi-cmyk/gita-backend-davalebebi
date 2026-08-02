import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { UserQueryDto } from "./dtos/user-query.dto";
import { IsValidMongoId } from "../common/is-valid-object-id.dto";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post("upgrade-subscription")
    upgradeSubscription(
        @Headers("email") email: string
    ){
        return this.userService.upgradeSubscription(email)
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

    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto
    ){
        // if(
        //     !createUserDto.email ||
        //     !createUserDto.firstName ||
        //     !createUserDto.gender ||
        //     !createUserDto.lastName ||
        //     !createUserDto.phoneNumber
        // ){
        //     throw new HttpException("Fill in all the required fields: firstName, lastName, email, phoneNumber and gender", HttpStatus.BAD_REQUEST)
        // }
        return this.userService.createUser(createUserDto)
    }

    @Delete(":id")
    deleteUserById(
        @Param() {id}: IsValidMongoId
    ){
        return this.userService.deleteUserById(id)
    }

    @Patch(":id")
    updateUserById(
        @Param() {id}: IsValidMongoId,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.userService.updateUserById(id, updateUserDto)
    }
}