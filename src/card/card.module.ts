import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListEntity } from '../list/list.entity';
import { UserEntity } from '../user/user.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardEntity } from './card.entity';
import { CardResolver } from './card.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, ListEntity, UserEntity])],
  controllers: [CardController],
  providers: [CardService, CardResolver],
})
export class CardModule { }
