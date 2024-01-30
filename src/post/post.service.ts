import {Injectable} from "@nestjs/common";

@Injectable()
export class PostService {

    async getPostById(id: number): Promise<void> {
        console.log(id);
    }

}