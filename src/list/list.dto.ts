import { IsString } from 'class-validator';

export class ListDTO {
  @IsString()
  name: string;
}
