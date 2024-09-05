import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewDTO } from './dto/new.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) { }
  @Post()
  createNewEndpoint(@Body() newsData: CreateNewDTO) {
    return this.newsService.createNew(newsData);
  }
  @Get()
  findAllEndpoint() {
    return this.newsService.findAll();
  }

  @Delete(':id')
  async deleteNewEndpoint(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.deleteNew(id);
  }

  @Put(':id')
  async updateNewEndpoint(@Param('id') id: string, @Body() newData: CreateNewDTO) {
    return this.newsService.editNew(Number(id), newData);
  }
}