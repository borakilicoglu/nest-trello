import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    UserModule,
    CommentModule,
    BoardModule,
    ListModule,
    CardModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
          user: 'postmaster@sandboxd3780b92ae8743b28dd8cbc3c592e9c1.mailgun.org',
          pass: '1q2w3e4r'
        }
      },
      defaults: {
        // from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
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
