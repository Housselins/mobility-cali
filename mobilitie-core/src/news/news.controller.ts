import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNewDTO } from './dto/new.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Post()
  createNewEndpoint(@Body() newsData: CreateNewDTO) {
    return this.newsService.createNew(newsData);
  }
  @Get()
  findAllEndpoint() {
    return this.newsService.findAll();
  }
}
