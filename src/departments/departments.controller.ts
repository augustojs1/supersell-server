import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';
import { Department } from '../prisma/models/department.model';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  public async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  public async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.update(id, updateDepartmentDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return await this.departmentsService.remove(id);
  }
}
