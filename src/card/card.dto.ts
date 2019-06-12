import { IsString } from 'class-validator';

export class CardDTO {
  readonly name: string;
  readonly description: string;
}
