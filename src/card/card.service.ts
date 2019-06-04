import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListEntity } from '../list/list.entity';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from './card.entity';
import { CardDTO } from './card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  private toResponseObject(card: CardEntity) {
    return {
      ...card,
      author: card.author && card.author.toResponseObject(),
    };
  }

  async showByList(listId: string, page: number = 1) {
    const cards = await this.cardRepository.find({
      where: { idea: { id: listId } },
      relations: ['author', 'idea'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return cards.map(card => this.toResponseObject(card));
  }

  async showByUser(userId: string, page: number = 1) {
    const cards = await this.cardRepository.find({
      where: { author: { id: userId } },
      relations: ['author', 'idea'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return cards.map(card => this.toResponseObject(card));
  }

  async show(id: string) {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['author', 'list'],
    });
    return this.toResponseObject(card);
  }

  async create(listId: string, userId: string, data: CardDTO) {
    const list = await this.listRepository.findOne({ where: { id: listId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const card = await this.cardRepository.create({
      ...data,
      list,
      author: user,
    });
    await this.cardRepository.save(card);
    return this.toResponseObject(card);
  }

  async destroy(id: string, userId: string) {
    const comment = await this.cardRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });

    if (comment.author.id !== userId) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.cardRepository.remove(comment);
    return this.toResponseObject(comment);
  }
}
