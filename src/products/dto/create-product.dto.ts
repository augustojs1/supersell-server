import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateFileDto } from '../../files/dto/create-file.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  department_id: string;

  @IsNotEmpty()
  @IsString()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  price: number;

  @IsNotEmpty()
  @IsString()
  used: boolean;

  @IsOptional()
  files?: CreateFileDto[];
}
