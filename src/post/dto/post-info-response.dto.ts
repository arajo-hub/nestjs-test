import {Post} from "../entities/Post.entity";

export class PostInfoResponseDto {
    id: number;

    static async from(postById: Post) {
        const postInfoRequestDto = new PostInfoResponseDto();
        postInfoRequestDto.id = postById.id;
        return postInfoRequestDto;
    }
}