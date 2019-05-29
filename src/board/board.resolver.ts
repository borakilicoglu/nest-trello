import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ListService } from '../list/list.service';
import { AuthGuard } from '../shared/auth.gaurd';
import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';

@Resolver('Board')
export class BoardResolver {
  constructor(
    private boardService: BoardService,
    // private listService: ListService,
  ) { }

  @Query()
  async boards(@Args('page') page: number, @Args('newest') newest: boolean) {
    return await this.boardService.showAll(page, newest);
  }

  @Query()
  async board(@Args('id') id: string) {
    return await this.boardService.read(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createIdea(
    @Args('id') id: string,
    @Args() { name }: BoardDTO,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data = { name };
    return await this.boardService.create(userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async updateBoard(
    @Args('id') id: string,
    @Args() { name }: BoardDTO,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    let data: any = {};
    name && (data.name = name);
    return await this.boardService.update(id, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteBoard(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.boardService.destroy(id, userId);
  }

  // @Mutation()
  // @UseGuards(new AuthGuard())
  // async upvote(@Args('id') id: string, @Context('user') user) {
  //   const { id: userId } = user;
  //   return await this.boardService.upvote(id, userId);
  // }

  // @Mutation()
  // @UseGuards(new AuthGuard())
  // async downvote(@Args('id') id: string, @Context('user') user) {
  //   const { id: userId } = user;
  //   return await this.boardService.downvote(id, userId);
  // }

  // @Mutation()
  // @UseGuards(new AuthGuard())
  // async bookmark(@Args('id') id: string, @Context('user') user) {
  //   const { id: userId } = user;
  //   return await this.boardService.bookmark(id, userId);
  // }

  // @Mutation()
  // @UseGuards(new AuthGuard())
  // async unbookmark(@Args('id') id: string, @Context('user') user) {
  //   const { id: userId } = user;
  //   return await this.boardService.unbookmark(id, userId);
  // }

  // @ResolveProperty()
  // async lists(@Parent() board) {
  //   const { id } = board;
  //   return await this.listService.showByBoard(id);
  // }
}
