import { Test, TestingModule } from '@nestjs/testing';
import { DirectorsService } from './directors.service';
import { Director } from './entities/director.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { PaginationAndFilterDto } from '../shared/pagination-and-filter.dto';

describe('DirectorsService', () => {
  let directorsService: DirectorsService;

  const directorRepoMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const directorMock: Director = {
    id: 'b1fec999-0c0b-4ef8-bb6d-7bb9bd380a22',
    name: 'Christopher Nolan',
    age: 53,
    films: [],
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorsService,
        {
          provide: getRepositoryToken(Director),
          useValue: directorRepoMock,
        },
      ],
    }).compile();

    directorsService = module.get<DirectorsService>(DirectorsService);
  });

  it('should be defined', () => {
    expect(directorsService).toBeDefined();
  });

  describe('create director', () => {
    it('should create and save a new director', async () => {
      const createDirectorDto: CreateDirectorDto = {
        name: 'Christopher Nolan',
        age: 53,
      };

      directorRepoMock.create.mockReturnValue(directorMock);
      directorRepoMock.save.mockResolvedValue(directorMock);

      const result = await directorsService.create(createDirectorDto);

      expect(directorRepoMock.create).toHaveBeenCalledWith(createDirectorDto);
      expect(directorRepoMock.save).toHaveBeenCalledWith(directorMock);
      expect(result).toEqual(directorMock);
    });
  });

  describe('findAll directors', () => {
    it('should return paginated directors with default skip and take values', async () => {
      directorRepoMock.find.mockResolvedValue([directorMock]);

      const filters: PaginationAndFilterDto = {};
      const result = await directorsService.findAll(filters);

      expect(directorRepoMock.find).toHaveBeenCalledWith({
        skip: 0,
        take: 30,
      });
      expect(result).toEqual([directorMock]);
    });

    it('should return paginated directors with custom page and take parameters', async () => {
      directorRepoMock.find.mockResolvedValue([directorMock]);

      const filters: PaginationAndFilterDto = { page: 2, take: 10 };
      const result = await directorsService.findAll(filters);

      expect(directorRepoMock.find).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
      });
      expect(result).toEqual([directorMock]);
    });
  });

  describe('findOne director', () => {
    it('should throw NotFoundException if director is not found', async () => {
      directorRepoMock.findOne.mockResolvedValue(null);

      await expect(
        directorsService.findOne('non-existing-id'),
      ).rejects.toThrow(new NotFoundException('Director nto found'));

      expect(directorRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existing-id' },
        relations: { films: true },
      });
    });

    it('should return a director when existing id is given', async () => {
      directorRepoMock.findOne.mockResolvedValue(directorMock);

      const result = await directorsService.findOne(directorMock.id);

      expect(directorRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: directorMock.id },
        relations: { films: true },
      });
      expect(result).toEqual(directorMock);
    });
  });

  describe('update director', () => {
    it('should throw NotFoundException if director to update is not found', async () => {
      directorRepoMock.findOne.mockResolvedValue(null);

      await expect(
        directorsService.update('non-existing-id', { name: 'New Name' }),
      ).rejects.toThrow(new NotFoundException('Director nto found'));
    });

    it('should update and return merged director when existing id is given', async () => {
      const updateDirectorDto = { name: 'Steven Spielberg' };
      directorRepoMock.findOne.mockResolvedValue(directorMock);
      directorRepoMock.update.mockResolvedValue({ affected: 1 });

      const result = await directorsService.update(
        directorMock.id,
        updateDirectorDto,
      );

      expect(directorRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: directorMock.id },
        relations: { films: true },
      });
      expect(directorRepoMock.update).toHaveBeenCalledWith(
        directorMock.id,
        updateDirectorDto,
      );
      expect(result).toEqual({ ...directorMock, ...updateDirectorDto });
    });
  });

  describe('remove director', () => {
    it('should throw NotFoundException if director to remove is not found', async () => {
      directorRepoMock.findOne.mockResolvedValue(null);

      await expect(
        directorsService.remove('non-existing-id'),
      ).rejects.toThrow(new NotFoundException('Director nto found'));
    });

    it('should successfully remove and return the director', async () => {
      directorRepoMock.findOne.mockResolvedValue(directorMock);
      directorRepoMock.remove.mockResolvedValue(directorMock);

      const result = await directorsService.remove(directorMock.id);

      expect(directorRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: directorMock.id },
        relations: { films: true },
      });
      expect(directorRepoMock.remove).toHaveBeenCalledWith(directorMock);
      expect(result).toEqual(directorMock);
    });
  });
});