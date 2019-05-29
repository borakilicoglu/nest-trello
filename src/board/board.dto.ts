import { IsString } from 'class-validator';

import { UserRO } from '../user/user.dto';

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
}
