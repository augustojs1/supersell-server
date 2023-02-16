import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Department } from '../prisma/models';

@Injectable()
export class DepartmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(name: string): Promise<Department> {
    const department = await this.prismaService.department.create({
      data: {
        name: name,
      },
    });

    return department;
  }

  public async findByName(name: string): Promise<Department | null> {
    const department = await this.prismaService.department.findFirst({
      where: {
        name: name,
      },
    });

    if (department) {
      return department;
    }

    return null;
  }

  public async update(departmentId: string, name: string): Promise<Department> {
    const updatedDepartment = await this.prismaService.department.update({
      where: {
        id: departmentId,
      },
      data: {
        name: name,
      },
    });

    return updatedDepartment;
  }

  public async delete(departmentId: string): Promise<void> {
    await this.prismaService.department.delete({
      where: {
        id: departmentId,
      },
    });
  }
}
