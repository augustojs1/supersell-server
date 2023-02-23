import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from '../departments.service';
import { DepartmentsRepository } from '../departments.repository';
import { Department } from 'src/prisma/models';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: DepartmentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: DepartmentsRepository,
          useValue: {
            create: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get<DepartmentsRepository>(DepartmentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new department', async () => {
    // Arrange
    const department = { name: 'Departamento1' };
    jest.spyOn(repository, 'findByName').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'create').mockResolvedValueOnce(department);

    // Act
    const result = await service.create(department);

    // Assert
    expect(result.name).toBeDefined();
    expect(repository.create).toHaveBeenCalled();
    expect(repository.findByName).toHaveBeenCalled();
  });

  it('should throw an error if a department with the same name already exist', async () => {
    // Arrange
    const newDepartment = { name: 'Departamento1' };
    const department = { name: 'Departamento1' };
    jest.spyOn(repository, 'findByName').mockResolvedValueOnce(department);

    try {
      // Act
      await service.create(newDepartment);
    } catch (error) {
      // Assert
      expect(error.status).toBe(400);
      expect(repository.findByName).toHaveBeenCalled();
    }
  });

  it('should return all registered departments in the database', async () => {
    // Arrange
    const departments: Department[] = [
      {
        name: 'Dep1',
        id: '12312',
      },
      {
        name: 'Dep2',
        id: '1231244',
      },
      {
        name: 'Dep3',
        id: '1231245',
      },
    ];
    jest.spyOn(repository, 'findAll').mockResolvedValueOnce(departments);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Dep1' })]),
    );
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Dep2' })]),
    );
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Dep3' })]),
    );
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should be able to return a department by a given id', async () => {
    // Arrange
    const departmentId = '7331';
    const department = { id: '7331', name: 'Dep1' };
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(department);

    // Act
    const result = await service.findOne(departmentId);

    // Assert
    expect(result.id).toBe(departmentId);
    expect(repository.findById).toHaveBeenCalled();
  });

  it('should throw an error if a department with a given id does not exist', async () => {
    // Arrange
    const departmentId = '3221';
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

    try {
      // Act
      await service.findOne(departmentId);
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(repository.findById).toHaveBeenCalled();
    }
  });

  it('should be able to update an existing department', async () => {
    // Arrange
    const departmentId = '1234';
    const newDepartment = { id: '1234', name: 'Dep2' };
    const department = { id: '1234', name: 'Dep1' };
    jest.spyOn(repository, 'findByName').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(department);
    jest.spyOn(repository, 'update').mockResolvedValueOnce(newDepartment);

    // Act
    const result = await service.update(departmentId, newDepartment);

    // Assert
    expect(result.id).toBe(departmentId);
    expect(result.name).toBe(newDepartment.name);
    expect(repository.update).toHaveBeenCalled();
    expect(repository.findByName).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalled();
  });

  it('should be able to delete an existing department', async () => {
    // Arrange
    const departmentId = '1234';
    const department = { id: '1234', name: 'Dep1' };
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(department);

    // Act
    const result = await service.remove(departmentId);

    // Assert
    expect(result).toBeFalsy();
    expect(repository.findById).toHaveBeenCalled();
  });
});
