import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Param,
  Logger,
  Post,
  Body,
  UsePipes,
  Query,
} from '@nestjs/common';

import { User } from '../user/user.decorator';
import { AuthGuard } from '../shared/auth.gaurd';
import { ValidationPipe } from '../shared/validation.pipe';
import { ListDTO } from './list.dto';
import { ListService } from './list.service';

@Controller('api/lists')
export class ListController {
  logger = new Logger('ListController');
  constructor(private listService: ListService) { }

  @Get('board/:id')
  showCommentsByBoard(@Param('id') name: string, @Query('page') page: number) {
    return this.listService.showByBoard(board, page);
  }

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createComment(
    @Param('id') idea: string,
    @User('id') user: string,
    @Body() data: ListDTO,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string, @Query('page') page: number) {
    return this.commentService.showByUser(user, page);
  }

  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: string, @User('id') user: string) {
    return this.commentService.destroy(id, user);
  }
}
