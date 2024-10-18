import { IsBoolean, IsNotEmpty, IsString, IsUrl, IsUUID, Matches } from "class-validator";
import { UUID } from "crypto";


export class CreateUrlShortenerDto {

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsUUID()
    @IsNotEmpty()
    owner: UUID;

    @IsString()
    @Matches(`^ENABLED|DISABLED`)
    @IsNotEmpty()
    status: string;

}
