import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersRepository } from '../../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HashProvider } from '../providers/hash.provider';

describe('AuthService', () => {
  let service: AuthService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashProvider,
        ConfigService,
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to sign up a new user', async () => {
    // Arrange
    const input = {
      username: 'user1',
      email: 'user1@email.com',
      password: '123456',
    };

    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'create').mockResolvedValueOnce({
      username: 'user1',
      email: 'user1@email.com',
      password: '162t3b126312gub1u3178',
    });

    jest
      .spyOn(service, 'getToken')
      .mockResolvedValueOnce({ access_token: 'awe12341242' });

    // Act
    const result = await service.signUpLocal(input);

    // Assert
    expect(result.access_token).toBeDefined();
  });

  it('should throw an error if an user with the same e-mail already exist', async () => {
    // Arrage
    const input = {
      username: 'user1',
      email: 'user1@email.com',
      password: '123456',
    };

    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce({
      username: '423432',
      email: '43242@email.com',
      password: '42342313',
    });

    try {
      // Act
      await service.signUpLocal(input);
    } catch (error) {
      // Assert
      expect(error.status).toBe(400);
    }
  });

  it('should be able to sign in with email and password', async () => {
    // Arrange
    const input = { email: 'user@email.com', password: '123456' };

    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce({
      username: 'user',
      password: 'ase12q34eas234',
      email: 'user@email.com',
    });

    jest
      .spyOn(service, 'getToken')
      .mockResolvedValueOnce({ access_token: 'awe12341242' });

    // Act
    const result = await service.signInLocal(input);

    // Assert
    expect(result.access_token).toBeDefined();
  });
});
