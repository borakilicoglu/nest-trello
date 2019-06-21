import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, CommentModule, BoardModule, ListModule, CardModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
  exports: [UserModule, CommentModule, BoardModule, ListModule, CardModule],
  controllers: [],
})
export class ApiModule { }
