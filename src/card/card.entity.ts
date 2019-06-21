import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(type => ListEntity, list => list.cards, { onDelete: 'CASCADE' })
  list: ListEntity;

  @OneToMany(type => CommentEntity, comment => comment.card, { cascade: true })
  comments: CommentEntity[];
}
