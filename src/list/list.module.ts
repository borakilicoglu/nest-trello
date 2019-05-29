import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../board/board.entity';
import { UserEntity } from '../user/user.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
// import { CommentResolver } from './comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, BoardEntity, UserEntity])],
  controllers: [ListController],
  // providers: [ListService, CommentResolver],
  providers: [ListService],
})
export class ListModule { }
