import { HttpException, HttpStatus } from "@nestjs/common";
import { UrlShortError } from "./urlshort.error";

export class UrlShortErrorHttp extends HttpException {

    constructor(error: UrlShortError) {
        super({
            status: HttpStatus.BAD_REQUEST,
            error: error.message
        }, HttpStatus.BAD_REQUEST, { cause: error });
    }
}