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

  private ensureOwnership(card: CardEntity, userId: string) {
    if (card.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showByList(listId: string, page: number = 1) {
    const cards = await this.cardRepository.find({
      where: { list: { id: listId } },
      relations: ['author', 'list'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return cards.map(card => this.toResponseObject(card));
  }

  async showByUser(userId: string, page: number = 1) {
    const cards = await this.cardRepository.find({
      where: { author: { id: userId } },
      relations: ['author', 'list'],
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

  async update(
    id: string,
    userId: string,
    data: Partial<CardDTO>,
  ): Promise<CardDTO> {
    let card = await this.cardRepository.findOne({
      where: { id },
      relations: ['author', 'list'],
    });
    if (!card) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(card, userId);
    await this.cardRepository.update({ id }, data);
    card = await this.cardRepository.findOne({
      where: { id },
      relations: ['author', 'list'],
    });
    return this.toResponseObject(card);
  }

  async destroy(id: string, userId: string) {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['author', 'list'],
    });

    if (card.author.id !== userId) {
      throw new HttpException(
        'You do not own this card',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.cardRepository.remove(card);
    return this.toResponseObject(card);
  }
}
