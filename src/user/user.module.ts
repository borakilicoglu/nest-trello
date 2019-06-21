import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../board/board.entity';
import { CardEntity } from '../card/card.entity';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, CardEntity, CommentEntity])],
  controllers: [UserController],
  providers: [UserService, UserResolver, CommentService]
})
export class UserModule { }
