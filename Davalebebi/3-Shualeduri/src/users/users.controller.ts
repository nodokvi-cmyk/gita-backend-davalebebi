import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidObjectId } from '../shared/dto/is-valid-object-id.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Cache mechanism - /users/all
  @Get("all")
  findAll() {
    return this.usersService.findAll();
  }

  // pagination
  @Get()
  find(
    @Query() queryParamsDto: QueryParamsDto
  ) {
    return this.usersService.find(queryParamsDto);
  }

  @Get("total-users")
  getUserCount(){
    return this.usersService.getUserCount()
  }


  @Get(':id')
  findOne(@Param('id') {id}: IsValidObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') {id}: IsValidObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') {id}: IsValidObjectId) {
    return this.usersService.remove(id);
  }
}
