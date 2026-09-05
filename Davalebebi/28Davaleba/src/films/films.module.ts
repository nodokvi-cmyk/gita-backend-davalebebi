import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Director } from '../directors/entities/director.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Director])
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
