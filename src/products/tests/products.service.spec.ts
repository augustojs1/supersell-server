import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { ProductsRepository } from '../products.repositoy';
import { DepartmentsRepository } from '../../departments/departments.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;
  let departmentsRepository: DepartmentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            create: jest.fn(),
            findOneByName: jest.fn(),
            findOneById: jest.fn(),
          },
        },
        {
          provide: DepartmentsRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
    departmentsRepository = module.get<DepartmentsRepository>(
      DepartmentsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create
  it('should be able to create a new product', async () => {
    // Arrange
    const userId = '12345';
    const product = {
      name: 'product1',
      description: 'a product1',
      department_id: '3212we2rs',
      quantity: 10,
      used: false,
    };
    jest.spyOn(repository, 'findOneByName').mockResolvedValueOnce(null);
    jest
      .spyOn(departmentsRepository, 'findById')
      .mockResolvedValueOnce({ name: '31312', id: '432423' });
    jest
      .spyOn(repository, 'create')
      .mockResolvedValueOnce({ ...product, user_id: '231424' });

    // Act
    const result = await service.create(userId, product);

    // Assert
    expect(result.name).toBeDefined();
  });

  it('should throw an error if a product with the same name exists', async () => {
    // Arrange
    const userId = '12345';
    const product = {
      name: 'product1',
      description: 'a product1',
      department_id: '3212we2rs',
      quantity: 10,
      used: false,
    };
    jest
      .spyOn(repository, 'findOneByName')
      .mockResolvedValueOnce({ ...product, user_id: '231424' });

    try {
      // Act
      await service.create(userId, product);
    } catch (error) {
      // Assert
      expect(error.status).toBe(400);
      expect(repository.findOneByName).toHaveBeenCalled();
    }
  });

  it('should throw an error if departmend with given id is not found', async () => {
    // Arrange
    const userId = '12345';
    const product = {
      name: 'product1',
      description: 'a product1',
      department_id: '3212we2rs',
      quantity: 10,
      used: false,
    };
    jest.spyOn(repository, 'findOneByName').mockResolvedValueOnce(null);
    jest.spyOn(departmentsRepository, 'findById').mockResolvedValueOnce(null);

    // Act
    try {
      await service.create(userId, product);
    } catch (error) {
      // Assert
      expect(error.status).toBe(404);
      expect(repository.findOneByName).toHaveBeenCalled();
      expect(departmentsRepository.findById).toHaveBeenCalled();
    }
  });
});
