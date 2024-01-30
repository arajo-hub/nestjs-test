import {PostController} from "./post.controller";
import {Module} from "@nestjs/common";
import {PostService} from "./post.service";

@Module({
    controllers: [PostController], //만든 컨트롤러를 여기에도 등록해야 하고
    providers: [PostService] //서비스를 여기에도 등록해야함
})
export class PostModule {}