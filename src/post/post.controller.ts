import {Body, Controller, Get, Param, Post, Req} from "@nestjs/common";
import {PostService} from "./post.service";
import {SavePostRequestDto} from "./dto/save-post-request.dto";
import {SavePostResponseDto} from "./dto/save-post-response.dto";
import {PostInfoResponseDto} from "./dto/post-info-response.dto";

@Controller('posts')
export class PostController { //export는 이 클래스를 다른 파일에서도 가져다 사용할 수 있도록 함
    constructor(
        private readonly postService: PostService) {}

    @Get('/:id')
    async getPost(@Param('id') post_id: number): Promise<PostInfoResponseDto> {
        return this.postService.getPostById(post_id);
    }

    @Post()
    async savePost(@Body() savePostRequestDto: SavePostRequestDto): Promise<SavePostResponseDto> {
        return this.postService.savePost(savePostRequestDto);
    }

    @Post('/transaction')
    async transaction(): Promise<void> {
        this.postService.transaction();
    }

}