import {Injectable, NotFoundException} from "@nestjs/common";
import {Post} from "./entities/Post.entity";
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {SavePostRequestDto} from "./dto/save-post-request.dto";
import {SavePostResponseDto} from "./dto/save-post-response.dto";
import {CreatePostDto} from "./dto/db-create-post.dto";
import {PostInfoResponseDto} from "./dto/post-info-response.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    async getPostById(id: number): Promise<PostInfoResponseDto> {
        let postById = await this.postRepository.findOneBy({
            id: id
        });
        return await PostInfoResponseDto.from(postById);
    }

    async savePost(savePostRequestDto: SavePostRequestDto): Promise<SavePostResponseDto> {
        const newPost = await CreatePostDto.from(savePostRequestDto);
        const newPostId = await this.postRepository.save(newPost);
        let savePostResponseDto = new SavePostResponseDto();
        savePostResponseDto.id = newPostId.id;
        return savePostResponseDto;
    }
}