import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../board/board.entity';
import { UserEntity } from '../user/user.entity';
import { CardService } from '../card/card.service';
import { CardEntity } from '../card/card.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { ListResolver } from './list.resolver';
import { AppGateway } from 'app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, BoardEntity, CardEntity, UserEntity])],
  controllers: [ListController],
  // providers: [ListService, CommentResolver],
  providers: [ListService, ListResolver, CardService, AppGateway],
})
export class ListModule { }
