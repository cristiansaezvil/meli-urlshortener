import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlShortenerDto } from './create-url-shortener.dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUrlShortenerDto extends PartialType(CreateUrlShortenerDto) {

    @IsString()
    id: string;

}
