import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashProvider {
  public async hashData(data: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(data, saltRounds);
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
