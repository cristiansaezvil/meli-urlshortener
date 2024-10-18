import { UUID } from "crypto";

export class UrlShortener {

    id: string;
    urlShort: URL;
    url: URL;
    owner: UUID;
    status: string;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    
}
