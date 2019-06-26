import { IsNotEmpty } from 'class-validator';
import { BoardEntity } from '../board/board.entity';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  password?: string;
  boards?: BoardEntity[];
  stars?: BoardEntity[];
}
