import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListEntity } from '../list/list.entity';
import { UserEntity } from '../user/user.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardEntity } from './card.entity';
// import { CommentResolver } from './comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ListEntity, UserEntity])],
  controllers: [CardController],
  // providers: [ListService, CommentResolver],
  providers: [CardService],
})
export class ListModule { }
