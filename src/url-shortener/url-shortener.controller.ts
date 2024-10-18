import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, Query, Redirect } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import { UrlShortError } from 'src/urlshort.error';
import { UrlShortErrorHttp } from 'src/urlshort.error.http';
import { StripAdditionalPropertiesInterceptor } from 'src/additionaproperties.interceptor';
import { UrlShortener } from './entities/url-shortener.entity';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) { }

  @Post()
  async create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    return await this.urlShortenerService.create(createUrlShortenerDto);
  }

  @Get()
  async findAll() {
    return await this.urlShortenerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.urlShortenerService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(StripAdditionalPropertiesInterceptor)
  async update(@Param('id') id: string, @Body() updateUrlShortenerDto: UpdateUrlShortenerDto) {
    try {
      return await this.urlShortenerService.update(id, updateUrlShortenerDto);
    } catch (e) {
      if (e instanceof UrlShortError)
        throw new UrlShortErrorHttp(e);
      else {
        console.error(e.message);
        throw e;
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.urlShortenerService.remove(id);
  }

  @Get('redirect/short')
  @Redirect()
  async redirect301(@Query('url') urlShort: string) {
    try {
      let url: URL = await this.urlShortenerService.countLink(new URL(urlShort));
      return { url: url, statusCode: HttpStatus.MOVED_PERMANENTLY };
    } catch (e) {
      if (e instanceof UrlShortError)
        throw new UrlShortErrorHttp(e);
      else
        throw e;
    }
  }
}
