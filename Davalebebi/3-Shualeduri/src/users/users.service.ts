import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserGender } from './schemas/user.schema';
import { faker } from '@faker-js/faker';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("user") private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){}

  // async onModuleInit(){
  //   const userCount = await this.userModel.countDocuments()
  //   if(userCount === 0){
  //     const dataToInsert: any = []
  //     console.log("Start seeding")

  //     for(let i = 0; i < 150_000; i++){
  //       dataToInsert.push({
  //         firstName: faker.person.firstName(),
  //         lastName: faker.person.lastName(),
  //         email: `${i}_${faker.internet.email()}`,
  //         gender: faker.helpers.arrayElement(Object.values(UserGender)),
  //         age: faker.number.int({min: 12, max: 80})
  //       })
  //     }
  //     await this.userModel.insertMany(dataToInsert)
  //     console.log("Seeding finished")
  //   }
  // }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({email: createUserDto.email})
    if(existingUser){
      throw new BadRequestException("User with this email already created")
    }

    const newUser = await this.userModel.create(createUserDto)

    await this.cacheManager.del("users")
    return newUser
  }

  // cache mechansim - /users/all
  async findAll() {
    const value = await this.cacheManager.get("users")
    if(!value){
      const resp = await this.userModel.find({age: 20})
      await this.cacheManager.set("users", resp, 2 * 60 * 1000)
      return resp
    }
    return value
  }

  // pagination - /users
  async find({page = 1, take = 10, age, ageFrom, ageTo, gender, name}: QueryParamsDto){
    const filter: any = {}

    if(age){
      filter["age"] = {"$eq": age}
    }

    if(ageFrom){
      filter["age"] = {...filter.age, $gte: ageFrom}
    }

    if(ageTo){
      filter["age"] = {...filter.age, $lte: ageTo}
    }

    if(gender){
      filter["gender"] = gender
    }

    if(name){
      filter.$or = [
        {firstName: {"$regex": name, "$options": "i"}},
        {lastName: {"$regex": name, "$options": "i"}}
      ]
    }

    const resp = await this.userModel
                            .find(filter)
                            .skip((page - 1) * take)
                            .limit(take)
    
  return resp
  }

  async getUserCount(){
    const userCount = await this.userModel.countDocuments()

    return {totalUsers: userCount}
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if(!user){
      throw new NotFoundException("User not found")
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findOne({email: updateUserDto.email})
    if(existingUser){
      throw new BadRequestException("This email is already used")
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {new: true}
    )

    if(!updatedUser){
      throw new NotFoundException("User not found")
    }
    await this.cacheManager.del("users")
    return updatedUser
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    if(!deletedUser){
      throw new NotFoundException("User not found")
    }
    await this.cacheManager.del("users")
    return deletedUser
  }
}
