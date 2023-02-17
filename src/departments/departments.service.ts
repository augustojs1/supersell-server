import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsRepository } from './departments.repository';
import { Department } from '../prisma/models';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  public async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const deparment = await this.departmentsRepository.findByName(
      createDepartmentDto.name,
    );

    if (deparment) {
      throw new HttpException(
        'There is already a department with this name!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.departmentsRepository.create(createDepartmentDto.name);
  }

  public async findAll(): Promise<Department[]> {
    return await this.departmentsRepository.findAll();
  }

  public async findOne(id: string): Promise<Department> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new HttpException(
        'Department with this id does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return department;
  }

  public async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const deparmentWithSameName = await this.departmentsRepository.findByName(
      updateDepartmentDto.name,
    );

    if (deparmentWithSameName) {
      throw new HttpException(
        'There is already a department with this name!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new HttpException(
        'Department with this id does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.departmentsRepository.update(
      id,
      updateDepartmentDto.name,
    );
  }

  public async remove(id: string): Promise<void> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new HttpException(
        'Department with this id does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.departmentsRepository.delete(id);
  }
}
