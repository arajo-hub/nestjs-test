import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostModule} from "../post/post.module";

@Module({
  imports: [
      PostModule // 컨트롤러 등록한 모듈을 여기에도 등록해야함
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
