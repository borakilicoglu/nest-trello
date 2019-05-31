import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [IdeaModule, UserModule, CommentModule, BoardModule, ListModule, CatsModule],
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
  exports: [IdeaModule, UserModule, CommentModule, BoardModule, ListModule],
  controllers: [],
})
export class ApiModule { }
