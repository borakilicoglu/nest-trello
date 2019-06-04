import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany
} from 'typeorm';

import { BoardEntity } from '../board/board.entity';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from '../card/card.entity';

@Entity('board')
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: String;

  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(type => BoardEntity, board => board.lists)
  board: BoardEntity;

  @OneToMany(type => CardEntity, card => card.list, { cascade: true })
  cards: CardEntity[];
}
