import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { Director } from '../directors/entities/director.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { PaginationAndFilterDto } from '../shared/pagination-and-filter.dto';

describe('FilmsService', () => {
  let filmsService: FilmsService;

  const filmRepoMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const directorRepoMock = {
    findOneBy: jest.fn(),
  };

  const directorMock: Director = {
    id: 'b1fec999-0c0b-4ef8-bb6d-7bb9bd380a22',
    age: 53,
    name: 'Christopher Nolan',
    films: [],
  };

  const filmMock: Film = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    director: directorMock,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: filmRepoMock,
        },
        {
          provide: getRepositoryToken(Director),
          useValue: directorRepoMock,
        },
      ],
    }).compile();

    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmsService).toBeDefined();
  });

  describe('create film', () => {
    const createFilmDto: CreateFilmDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      director: 'b1fec999-0c0b-4ef8-bb6d-7bb9bd380a22',
    };

    it('should throw NotFoundException if director does not exist', async () => {
      directorRepoMock.findOneBy.mockResolvedValue(null);

      await expect(filmsService.create(createFilmDto)).rejects.toThrow(
        new NotFoundException('Director not found'),
      );
    });

    it('should create and save film when director exists', async () => {
      directorRepoMock.findOneBy.mockResolvedValue(directorMock);
      filmRepoMock.create.mockReturnValue(filmMock);
      filmRepoMock.save.mockResolvedValue(filmMock);

      const result = await filmsService.create(createFilmDto);

      expect(directorRepoMock.findOneBy).toHaveBeenCalledWith({
        id: createFilmDto.director,
      });
      expect(filmRepoMock.create).toHaveBeenCalledWith({
        ...createFilmDto,
        director: directorMock,
      });
      expect(filmRepoMock.save).toHaveBeenCalledWith(filmMock);
      expect(result).toEqual(filmMock);
    });
  });

  describe('findAll films', () => {
    it('should return paginated and filtered films', async () => {
      const queryBuilderMock = {
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([filmMock]),
      };

      filmRepoMock.createQueryBuilder.mockReturnValue(queryBuilderMock);

      const filters: PaginationAndFilterDto = {
        genre: 'Sci-Fi',
        title: 'Inception',
        yearFrom: 2000,
        yearTo: 2020,
        page: 2,
        take: 10,
      };

      const result = await filmsService.findAll(filters);

      expect(filmRepoMock.createQueryBuilder).toHaveBeenCalledWith('film');
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'film.genre LIKE :genre',
        { genre: 'Sci-Fi%' },
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'film.title LIKE :title',
        { title: 'Inception%' },
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'film.year >= :yearFrom',
        { yearFrom: 2000 },
      );
      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
        'film.year <= :yearTo',
        { yearTo: 2020 },
      );
      expect(queryBuilderMock.skip).toHaveBeenCalledWith(10);
      expect(queryBuilderMock.take).toHaveBeenCalledWith(10);
      expect(result).toEqual([filmMock]);
    });
  });

  describe('get film by id', () => {
    it("should throw not found exception when correct id given, but film with that id doesn't exist", async () => {
      filmRepoMock.findOne.mockResolvedValue(null);
      await expect(
        filmsService.findOne('991559d1-f4ac-4385-b4b1-cfaa30ec46da'),
      ).rejects.toThrow(new NotFoundException('Film not found'));
    });

    it("should return film when correct and existing film's id is given", async () => {
      filmRepoMock.findOne.mockResolvedValue(filmMock);
      const film = await filmsService.findOne('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
      expect(film.id).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
    });
  });

  describe('update film', () => {
    it('should throw NotFoundException if film does not exist', async () => {
      filmRepoMock.findOne.mockResolvedValue(null);

      await expect(
        filmsService.update('non-existing-id', { title: 'Updated' }),
      ).rejects.toThrow(new NotFoundException('Film not found'));
    });

    it('shouuld throw NotFoundException if film exists but updated director is not found', async () => {
      filmRepoMock.findOne.mockResolvedValue(filmMock);
      directorRepoMock.findOneBy.mockResolvedValue(null);

      await expect(
        filmsService.update(filmMock.id, { director: 'wrong-director-id' }),
      ).rejects.toThrow(new NotFoundException('Director not found'));
    });

    it('should successfully update film with new director and fields', async () => {
      filmRepoMock.findOne.mockResolvedValue({ ...filmMock });
      directorRepoMock.findOneBy.mockResolvedValue(directorMock);
      filmRepoMock.save.mockImplementation(async (updatedFilm) => updatedFilm);

      const updateDto = { title: 'Inception Updated', director: directorMock.id };
      const result = await filmsService.update(filmMock.id, updateDto);

      expect(result.title).toBe('Inception Updated');
      expect(filmRepoMock.save).toHaveBeenCalled();
    });
  });

  describe('remove film', () => {
    it('should throw NotFoundException if film to remove does not exist', async () => {
      filmRepoMock.findOne.mockResolvedValue(null);

      await expect(filmsService.remove('non-existing-id')).rejects.toThrow(
        new NotFoundException('Film not found'),
      );
    });

    it('should successfully remove film when it exists', async () => {
      filmRepoMock.findOne.mockResolvedValue(filmMock);
      filmRepoMock.remove.mockResolvedValue(filmMock);

      const result = await filmsService.remove(filmMock.id);

      expect(filmRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: filmMock.id },
        relations: { director: true },
      });
      expect(filmRepoMock.remove).toHaveBeenCalledWith(filmMock);
      expect(result).toEqual(filmMock);
    });
  });
});