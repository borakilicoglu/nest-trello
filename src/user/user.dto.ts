import { IsNotEmpty } from 'class-validator';
import { BoardEntity } from '../board/board.entity';

export class UserDTO {
  id: string;

  @IsNotEmpty()
  username: string;

  // @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  email?: string;
  role: string;
  created: Date;
  token?: string;
  password?: string;
  boards?: BoardEntity[];
  stars?: BoardEntity[];
}
