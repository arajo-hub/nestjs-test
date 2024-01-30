import {PostController} from "./post.controller";
import {Module} from "@nestjs/common";

@Module({
    controllers: [PostController], //만든 컨트롤러를 여기에도 등록해야 하고
})
export class PostModule {}