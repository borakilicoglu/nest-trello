import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';

@Resolver('Board')
export class BoardResolver {
  constructor(private boardService: BoardService) {}

  @Query()
  @UseGuards(new AuthGuard())
  async boards(
    @Args('page') page: number,
    @Context('user') user,
    @Args('newest') newest: boolean,
  ) {
    return await this.boardService.showAll(page, user, newest);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async board(@Args('id') id: string, @Context('user') user) {
    return await this.boardService.read(id, user);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createBoard(
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

  @Mutation()
  @UseGuards(new AuthGuard())
  async addStar(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.boardService.addStar(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async removeStar(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.boardService.removeStar(id, userId);
  }
}
