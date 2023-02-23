import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from '../departments.controller';
import { DepartmentsService } from '../departments.service';
import { Department } from '../../prisma/models';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [
        {
          provide: DepartmentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new department', async () => {
    // Arrange
    const newDepartment = { name: 'Dep1' };
    jest.spyOn(service, 'create').mockResolvedValueOnce(newDepartment);

    // Act
    const result = await controller.create(newDepartment);

    // Assert
    expect(result.name).toBe(newDepartment.name);
    expect(service.create).toHaveBeenCalled();
  });

  it('should throw an error if department name already exist', async () => {
    // Arrange
    const department = { name: 'Dep2' };

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(
        new Error('There is already a department with this name!'),
      );

    try {
      // Act
      await controller.create(department);
    } catch (error) {
      // Assert
      expect(error.message).toBe(
        'There is already a department with this name!',
      );

      expect(service.create).toHaveBeenCalled();
    }
  });

  it('should return all departments', async () => {
    // Arrange
    const departments: Department[] = [
      {
        name: 'Dep1',
      },
      {
        name: 'Dep2',
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(departments);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Dep1' })]),
    );
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Dep2' })]),
    );
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a department with a given id', async () => {
    // Arrange
    const id = '1234';
    const department = { id: '1234', name: 'Dep1' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(department);

    // Act
    const result = await service.findOne(id);

    // Assert
    expect(result.id).toBe(id);
    expect(service.findOne).toHaveBeenCalled();
  });

  it('should throw an error if a department with a given id does not exist', async () => {
    // Arrange
    const id = '1234';
    const errorMessage = 'Department with this id does not exists!';
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new Error(errorMessage));

    try {
      // Act
      await controller.findOne(id);
    } catch (error) {
      // Assert
      expect(error.message).toBe(errorMessage);
      expect(service.findOne).toHaveBeenCalled();
    }
  });

  it('should be able to update an existent department', async () => {
    // Arrange
    const departmentId = '1234';
    const newDepartment = { id: '1234', name: 'Dep2' };
    const department = { id: '1234', name: 'Dep1' };
    jest.spyOn(service, 'update').mockResolvedValueOnce(newDepartment);

    // Act
    const result = await service.update(departmentId, newDepartment);

    // Assert
    expect(result.id).toBe(departmentId);
    expect(result.name).toBe(newDepartment.name);
    expect(service.update).toHaveBeenCalled();
  });

  it('should be able to delete an existent department', async () => {
    // Arrange
    const departmentId = '1234';
    jest.spyOn(service, 'remove').mockResolvedValueOnce();

    // Act
    const result = await service.remove(departmentId);

    // Assert
    expect(result).toBeFalsy();
    expect(service.remove).toHaveBeenCalled();
  });
});
