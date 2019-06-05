import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CardService } from './card.service';
import { AuthGuard } from 'shared/auth.gaurd';

@Resolver('Card')
export class CardResolver {
  constructor(private cardService: CardService) { }

  @Query()
  async card(@Args('id') id: string) {
    return await this.cardService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createCard(
    @Args('list') listId: string,
    @Args('name') name: string,
    @Args('description') description: string,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data = { name, description };
    return await this.cardService.create(listId, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteCard(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.cardService.destroy(id, userId);
  }
}
