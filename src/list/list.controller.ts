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
  showListByBoard(@Param('id') board: string, @Query('page') page: number) {
    return this.listService.showByBoard(board, page);
  }

  @Post('board/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createList(
    @Param('id') board: string,
    @User('id') user: string,
    @Body() data: ListDTO
  ) {
    return this.listService.create(board, user, data);
  }

  @Get('user/:id')
  showListsByUser(@Param('id') user: string, @Query('page') page: number) {
    return this.listService.showByUser(user, page);
  }

  @Get(':id')
  showList(@Param('id') id: string) {
    return this.listService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyList(@Param('id') id: string, @User('id') user: string) {
    return this.listService.destroy(id, user);
  }
}
