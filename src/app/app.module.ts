import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostModule} from "../post/post.module";
import {PostService} from "../post/post.service";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LogIntercetor} from "../common/log.interceptor";

@Module({
  imports: [
      PostModule // 컨트롤러 등록한 모듈을 여기에도 등록해야함
  ],
  controllers: [AppController],
  providers: [AppService,
      {
          provide: APP_INTERCEPTOR,
          useClass: LogIntercetor,
      }],
})
export class AppModule {}
