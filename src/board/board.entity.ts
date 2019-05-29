import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ListEntity } from '../list/list.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('text')
  name: String;

  @ManyToOne(type => UserEntity, author => author.boards)
  @JoinTable()
  author: UserEntity;

  @OneToMany(type => ListEntity, list => list.board, { cascade: true })
  lists: ListEntity[];
}
