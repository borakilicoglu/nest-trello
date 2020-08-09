import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from './list.entity';
import { UserEntity } from '../user/user.entity';
import { BoardEntity } from '../board/board.entity';
import { ListDTO } from './list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  private toResponseObject(list: ListEntity) {
    return {
      ...list,
      author: list.author && list.author.toResponseObject(),
    };
  }

  private ensureOwnership(list: ListEntity, userId: string) {
    if (list.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showByBoard(boardId: string, page: number = 1) {
    const lists = await this.listRepository.find({
      where: { board: { id: boardId } },
      relations: ['author', 'board', 'cards'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return lists.map(list => this.toResponseObject(list));
  }

  async showByUser(userId: string, page: number = 1) {
    const lists = await this.listRepository.find({
      where: { author: { id: userId } },
      relations: ['author', 'board'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return lists.map(list => this.toResponseObject(list));
  }

  async show(id: string) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['author', 'board', 'cards'],
    });
    return this.toResponseObject(list);
  }

  async create(boardId: string, userId: string, data: ListDTO) {
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const list = await this.listRepository.create({
      ...data,
      board,
      author: user,
    });
    await this.listRepository.save(list);
    return this.toResponseObject(list);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<ListDTO>,
  ): Promise<ListDTO> {
    let list = await this.listRepository.findOne({
      where: { id },
      relations: ['author', 'board'],
    });
    if (!list) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(list, userId);
    await this.listRepository.update({ id }, data);
    list = await this.listRepository.findOne({
      where: { id },
      relations: ['author', 'board'],
    });
    return this.toResponseObject(list);
  }

  async destroy(id: string, userId: string) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!list) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (list.author.id !== userId) {
      throw new HttpException(
        'You do not own this list',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.listRepository.remove(list);
    return this.toResponseObject(list);
  }
}
