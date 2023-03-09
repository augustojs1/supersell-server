export class CreateFileDto {
  user_id?: string;
  product_id?: string;
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}
