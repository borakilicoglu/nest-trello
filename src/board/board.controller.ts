import {
  Controller,
  Get,
  Logger,
  Post,
  Param,
  Body,
  Delete,
  Put,
  UsePipes,
  UseGuards,
  Query,
} from '@nestjs/common';

import { User } from '../user/user.decorator';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.gaurd';
import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';

@Controller('api/boards')
export class BoardController {
  private logger = new Logger('BoardController');

  constructor(private boardService: BoardService) { }

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    options.id && this.logger.log('BOARD' + JSON.stringify(options.id));
  }

  @Get()
  showAllIBoards(@Query('page') page: number) {
    return this.boardService.showAll(page);
  }

  @Get('/newest')
  showNewestBoards(@Query('page') page: number) {
    return this.boardService.showAll(page, true);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createBoard(@User('id') user, @Body() body: BoardDTO) {
    this.logData({ user, body });
    return this.boardService.create(user, body);
  }

  @Get(':id')
  readBoard(@Param('id') id: string) {
    this.logData({ id });
    return this.boardService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateBoard(
    @Param('id') id: string,
    @User('id') user,
    @Body() body: Partial<BoardDTO>,
  ) {
    this.logData({ id, user, body });
    return this.boardService.update(id, user, body);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyBoard(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.boardService.destroy(id, user);
  }

  // @Post(':id/upvote')
  // @UseGuards(new AuthGuard())
  // upvoteBoard(@Param('id') id: string, @User('id') user: string) {
  //   this.logData({ id, user });
  //   return this.boardService.upvote(id, user);
  // }

  // @Post(':id/downvote')
  // @UseGuards(new AuthGuard())
  // downvoteBoard(@Param('id') id: string, @User('id') user: string) {
  //   this.logData({ id, user });
  //   return this.boardService.downvote(id, user);
  // }

  // @Post(':id/bookmark')
  // @UseGuards(new AuthGuard())
  // bookmarkBoard(@Param('id') id: string, @User('id') user: string) {
  //   this.logData({ id, user });
  //   return this.boardService.bookmark(id, user);
  // }

  // @Delete(':id/bookmark')
  // @UseGuards(new AuthGuard())
  // unbookmarkBoard(@Param('id') id: string, @User('id') user: string) {
  //   this.logData({ id, user });
  //   return this.boardService.unbookmark(id, user);
  // }
}
