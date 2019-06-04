import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../board/board.entity';
import { UserEntity } from '../user/user.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { ListResolver } from './list.resolver';
import { AppGateway } from 'app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, BoardEntity, UserEntity])],
  controllers: [ListController],
  // providers: [ListService, CommentResolver],
  providers: [ListService, ListResolver, AppGateway],
})
export class ListModule { }
