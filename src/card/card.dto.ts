import { IsString } from 'class-validator';

export class CardDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
