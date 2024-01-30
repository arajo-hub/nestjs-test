import {IsString, Length, MaxLength} from 'class-validator';

export class SavePostRequestDto {
    @IsString()
    @MaxLength(5)
    title: string;
    @IsString()
    @MaxLength(5)
    content: string;
}