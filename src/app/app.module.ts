import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostModule} from "../post/post.module";
import { ConfigModule } from '@nestjs/config';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LogIntercetor} from "../common/log.interceptor";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../post/entities/Post.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: 'env/.env'
      }),
      TypeOrmModule.forRoot({
          type: "mysql",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_DATABASE,
          entities: [Post],
          synchronize: true,
          logging: true
      }),
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
