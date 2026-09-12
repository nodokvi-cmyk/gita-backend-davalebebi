import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpException, HttpStatus, Param, Patch, Post, Query, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { QueryParamsDto, } from "./dtos/query-params.dto";
import { IsValidMongoId } from "../common/is-valid-object-id.dto";
import { IsAuthGuard } from "../guards/is-auth.guard";
import { UserId } from "./decorators/user.decorator";
import { Throttle } from "@nestjs/throttler";
import { memoryStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Patch(':id/avatar')
    @UseInterceptors(FileInterceptor('avatar', { storage: memoryStorage() }))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param("id") userId: string) {
      console.log(file);
      return this.userService.uploadAvatar(file, userId)
    }

    @Delete(":id/avatar")
    deleteAvatar(
      @Param("id") userId: string
    ){
      return this.userService.deleteAvatar(userId)
    }

    // @Post("upgrade-subscription")
    // // @Throttle({default: {ttl: 60 * 1000, limit: 5, blockDuration: 30 * 1000}})
    // // @UseGuards(IsAuthGuard)
    // upgradeSubscription(
    //     // @Headers("email") email: string
    //     @UserId() userId
    // ){
    //     return this.userService.upgradeSubscription(userId)
    // }

    @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("statistic")
  getStats(){
    return this.userService.getStats()
  }

  @Get()
  findAll(
    @Query() queryParamsDto: QueryParamsDto
  ) {
    return this.userService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') {id}: IsValidMongoId) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') {id}: IsValidMongoId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    // @Param('id') {id}: IsValidMongoId
    @Param("id") id: string
) {
    return this.userService.remove(id);
  }
}