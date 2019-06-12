import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: String;

  @Column('text', { nullable: true })
  description: String;

  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(type => ListEntity, list => list.cards, { onDelete: 'CASCADE' })
  list: ListEntity;
}
