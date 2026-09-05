import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';
import { PaginationAndFilterDto } from '../shared/pagination-and-filter.dto';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director) private directorRepo: Repository<Director>
  ){}

  async create(createDirectorDto: CreateDirectorDto) {
    const newDirector = await this.directorRepo.create(createDirectorDto)
    return await this.directorRepo.save(newDirector)
  }

  async findAll({page = 1, take = 30}: PaginationAndFilterDto) {
    const skip = (page - 1) * take

    return await this.directorRepo.find({
      skip,
      take
    })
  }

  async findOne(id: string) {
    const director  = await this.directorRepo.findOne({where: {id}, relations: {films: true}})
    if(!director){
      throw new NotFoundException("Director nto found")
    }

    return director
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const director  = await this.directorRepo.findOne({where: {id}, relations: {films: true}})
    if(!director){
      throw new NotFoundException("Director nto found")
    }
    await this.directorRepo.update(id, updateDirectorDto)
    return {...director, ...updateDirectorDto}
  }

  async remove(id: string) {
    const director  = await this.directorRepo.findOne({where: {id}, relations: {films: true}})
    if(!director){
      throw new NotFoundException("Director nto found")
    }
    return await this.directorRepo.remove(director)
  }
}
