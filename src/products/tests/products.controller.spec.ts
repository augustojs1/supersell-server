import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { Product } from '../../prisma/models';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // create
  it('should be able to create a new product', async () => {
    // Arrange
    const product: Product = {
      id: '213123',
      name: 'produto 1',
      description: 'um belo produto',
      quantity: 10,
      used: false,
      user_id: '432423',
      department_id: '321312',
    };
    const currentUser = {
      sub: '231312',
      email: 'user@email.com',
      isAdmin: false,
      iat: 213123,
      exp: 312312,
    };
    jest.spyOn(service, 'create').mockResolvedValueOnce(product);

    // Act
    const result = await controller.create(product, currentUser);

    // Assert
    expect(result.name).toBeDefined();
    expect(service.create).toHaveBeenCalled();
  });

  it('should throw an error if given an invalid department id', async () => {
    // Arrange
    const product: Product = {
      id: '213123',
      name: 'produto 1',
      description: 'um belo produto',
      quantity: 10,
      used: false,
      user_id: '432423',
      department_id: '321312',
    };
    const currentUser = {
      sub: '231312',
      email: 'user@email.com',
      isAdmin: false,
      iat: 213123,
      exp: 312312,
    };
    jest
      .spyOn(service, 'create')
      .mockRejectedValueOnce(
        new Error('Department with this id does not exist'),
      );

    // Act
    try {
      await controller.create(product, currentUser);
    } catch (error) {
      // Assert
      expect(error.message).toBe('Department with this id does not exist');
      expect(service.create).toHaveBeenCalled();
    }
  });
});
