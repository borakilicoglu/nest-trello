import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { BoardEntity } from './board.entity';
import { BoardDTO, BoardRO } from './board.dto';
import { AppGateway } from '../app.gateway';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private gateway: AppGateway,
  ) { }

  private boardToResponseObject(board: BoardEntity): BoardRO {
    const responseObject: any = {
      ...board,
      // author: board.author ? board.author.toResponseObject(false) : null,
    };
    return responseObject;
  }

  private ensureOwnership(board: BoardEntity, userId: string) {
    if (board.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(page: number = 1, newest?: boolean): Promise<BoardRO[]> {
    const boards = await this.boardRepository.find({
      relations: ['author', 'lists'],
      take: 25,
      skip: 25 * (page - 1),
      order: newest && { created: 'DESC' },
    });
    return boards.map(board => this.boardToResponseObject(board));
  }

  async read(id: string): Promise<BoardRO> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['author', 'lists'],
    });
    if (!board) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.boardToResponseObject(board);
  }

  async create(userId: string, data: BoardDTO): Promise<BoardRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const board = await this.boardRepository.create({ ...data, author: user });
    await this.boardRepository.save(board);
    this.gateway.wss.emit('newBoard', board);
    return this.boardToResponseObject(board);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<BoardDTO>,
  ): Promise<BoardRO> {
    let board = await this.boardRepository.findOne({
      where: { id },
      relations: ['author', 'lists'],
    });
    if (!board) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(board, userId);
    await this.boardRepository.update({ id }, data);
    board = await this.boardRepository.findOne({
      where: { id },
      relations: ['author', 'lists'],
    });
    return this.boardToResponseObject(board);
  }

  async destroy(id: string, userId: string): Promise<BoardRO> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!board) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(board, userId);
    await this.boardRepository.remove(board);
    return this.boardToResponseObject(board);
  }

  async addStar(id: string, userId: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['stars'],
    });

    if (user.stars.filter(star => star.id === board.id).length < 1) {
      user.stars.push(board);
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Board already stared ',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject(false);
  }

  async removeStar(id: string, userId: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['stars'],
    });

    if (user.stars.filter(star => star.id === board.id).length > 0) {
      user.stars = user.stars.filter(
        star => star.id !== board.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Cannot remove star', HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject(false);
  }
}
