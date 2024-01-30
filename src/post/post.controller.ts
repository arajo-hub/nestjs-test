import {Controller, Get, Param, Post} from "@nestjs/common";

@Controller('posts')
export class PostController { //export는 이 클래스를 다른 파일에서도 가져다 사용할 수 있도록 함

    @Get('/:id')
    async getPost(@Param('id') post_id: number): Promise<void> {
        console.log(post_id);
    }

}