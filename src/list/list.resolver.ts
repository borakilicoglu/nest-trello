import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ListService } from './list.service';
import { AuthGuard } from 'shared/auth.gaurd';

@Resolver('List')
export class ListResolver {
  constructor(private listService: ListService) { }

  @Query()
  async lists(@Args('boardId') boardId: string, @Args('page') page: number) {
    return await this.listService.showByBoard(boardId, page);
  }

  @Query()
  async list(@Args('id') id: string) {
    return await this.listService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createList(
    @Args('board') boardId: string,
    @Args('name') name: string,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data = { name };
    return await this.listService.create(boardId, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteList(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.listService.destroy(id, userId);
  }
}
