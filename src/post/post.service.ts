import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {Post} from "./entities/Post.entity";
import {Connection, DataSource, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {SavePostRequestDto} from "./dto/save-post-request.dto";
import {SavePostResponseDto} from "./dto/save-post-response.dto";
import {CreatePostDto} from "./dto/db-create-post.dto";
import {PostInfoResponseDto} from "./dto/post-info-response.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly dataSource: DataSource,
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

    async transaction(): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //비즈니스 로직 시작
            for (let i = 0; i < 5; i++) {
                let savePost: SavePostRequestDto = new SavePostRequestDto();
                savePost.title = `게시글${i}`;
                savePost.content = `게시글내용${i}`;
                await queryRunner.manager.save(Post, savePost);
                if (i == 2) {
                    throw new BadRequestException();
                }
            }
            //비즈니스 로직 끝

            await queryRunner.commitTransaction();
        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();
            throw new NotFoundException(e);
        } finally {
            await queryRunner.release();
        }
    }
}