import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { Director } from '../directors/entities/director.entity';
import { PaginationAndFilterDto } from '../shared/pagination-and-filter.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepo: Repository<Film>,
    @InjectRepository(Director) private directorRepo: Repository<Director>,
  ){}

  async create(createFilmDto: CreateFilmDto) {
    const director = await this.directorRepo.findOneBy({id: createFilmDto.director})
    if(!director){
      throw new NotFoundException("Director not found")
    }

    const newFilm = await this.filmRepo.create({
      ...createFilmDto,
      director
    })
    return await this.filmRepo.save(newFilm)
  }

  async findAll({genre, title, page = 1, take = 30, yearFrom, yearTo}: PaginationAndFilterDto) {
    const skip = (page - 1) * take
    
    const query = await this.filmRepo.createQueryBuilder("film")

    if(genre){
      query.andWhere("film.genre LIKE :genre", {genre: `${genre}%`})
    }

    if(title){
      query.andWhere("film.title LIKE :title", {title: `${title}%`})
    }

    if(yearFrom){
      query.andWhere("film.year >= :yearFrom", {yearFrom})
    }

    if(yearTo){
      query.andWhere("film.year <= :yearTo", {yearTo})
    }

    return await query.skip(skip).take(take).getMany()
  }

  async findOne(id: string) {
    const film = await this.filmRepo.findOne({where: {id}, relations: {director: true}})
    if(!film){
      throw new NotFoundException("Film not found")
    }
    return film
  }

  async update(id: string, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepo.findOne({where: {id}, relations: {director: true}})
    if(!film){
      throw new NotFoundException("Film not found")
    }

    const {director, ...rest} = updateFilmDto

    if(director){
      const directorEntity = await this.directorRepo.findOneBy({id: director})
      if(!directorEntity){
        throw new NotFoundException("Director not found")
      }
      film.director = directorEntity
    }

    Object.assign(film, rest)
    return await this.filmRepo.save(film)
  }

  async remove(id: string) {
    const film = await this.filmRepo.findOne({where: {id}, relations: {director: true}})
    if(!film){
      throw new NotFoundException("Film not found")
    }
    return await this.filmRepo.remove(film)
  }
}
