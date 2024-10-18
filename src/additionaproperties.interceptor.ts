import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { UpdateUrlShortenerDto } from './url-shortener/dto/update-url-shortener.dto';

@Injectable()
export class StripAdditionalPropertiesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const body = request.body;

        const dtoClass = this.getDto(context);
        const dtoInstance = plainToInstance(dtoClass, body);

        Object.keys(body).forEach(key => {
            if (!(key in dtoInstance)) {
                delete body[key];
            }
        });
        return next.handle().pipe(map(data => data));
    }

    private getDto(context: ExecutionContext): any {
        const handler = context.getHandler();
        const dtoClass = UpdateUrlShortenerDto;
        return dtoClass;
    }
}
