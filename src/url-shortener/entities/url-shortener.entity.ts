import { UUID } from "crypto";

export class UrlShortener {

    id: string;
    urlShort: URL;
    url: URL;
    owner: UUID;
    status: string;
    clickCount: number;
    clickLastDate: Date;
    createdAt: Date;
    updatedAt: Date;
    
}
