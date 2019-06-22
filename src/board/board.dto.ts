import { IsString } from 'class-validator';
import { UserRO } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';

export class BoardDTO {
  @IsString()
  readonly name: string;
}

export class BoardRO {
  id: string;
  created: Date;
  updated: Date;
  name: string;
  author: UserRO;
  stars?: UserRO[];
  star?: boolean;
}
