import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUser()
    }

    @Get(":userId")
    getUserById(
        @Param("userId") userId: string
    ){
        return this.userService.getUserById(Number(userId))
    }

    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto
    ){
        if(
            !createUserDto.email ||
            !createUserDto.firstName ||
            !createUserDto.gender ||
            !createUserDto.lastName ||
            !createUserDto.phoneNumber
        ){
            throw new HttpException("Fill in all the required fields: firstName, lastName, email, phoneNumber and gender", HttpStatus.BAD_REQUEST)
        }
        return this.userService.createUser(createUserDto)
    }

    @Delete(":userId")
    deleteUserById(
        @Param("userId") userId: string
    ){
        return this.userService.deleteUserById(Number(userId))
    }

    @Patch(":userId")
    updateUserById(
        @Param("userId") userId: string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.userService.updateUserById(Number(userId), updateUserDto)
    }
}