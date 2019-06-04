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
import { CardDTO } from './card.dto';
import { CardService } from './card.service';

@Controller('api/cards')
export class CardController {
  logger = new Logger('CardController');
  constructor(private cardService: CardService) { }

  @Get('list/:id')
  showCommentsByList(@Param('id') list: string, @Query('page') page: number) {
    return this.cardService.showByList(list, page);
  }

  @Post('list/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createCard(
    @Param('id') list: string,
    @User('id') user: string,
    @Body() data: CardDTO,
  ) {
    return this.cardService.create(list, user, data);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string, @Query('page') page: number) {
    return this.cardService.showByUser(user, page);
  }

  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.cardService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: string, @User('id') user: string) {
    return this.cardService.destroy(id, user);
  }
}
