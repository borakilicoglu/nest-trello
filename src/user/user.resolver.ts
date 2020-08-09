import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/auth.guard';
import { CommentService } from '../comment/comment.service';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) { }
  @Query()
  async users(@Args('page') page: number) {
    return await this.userService.showAll(page);
  }

  @Query()
  async user(@Args('username') username: string) {
    return await this.userService.read(username);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { username } = user;
    return await this.userService.read(username);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, email, password };
    return await this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, email, password };
    return await this.userService.register(user);
  }

  @ResolveField()
  async comments(@Parent() user) {
    const { id } = user;
    return await this.commentService.showByUser(id);
  }
}
