import {SavePostRequestDto} from "./save-post-request.dto";

export class CreatePostDto {
    static async from(savePostRequestDto: SavePostRequestDto): Promise<CreatePostDto> {
        const createPostDto: CreatePostDto = new CreatePostDto();
        createPostDto.title = savePostRequestDto.title;
        createPostDto.content = savePostRequestDto.content;
        return createPostDto;
    }

    title: string;

    content: string;
}