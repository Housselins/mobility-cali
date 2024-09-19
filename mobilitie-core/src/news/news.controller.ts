import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewDTO, NewFilter } from './dto/new.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Post()
  createNewEndpoint(@Body() newsData: CreateNewDTO) {
    return this.newsService.createNew(newsData);
  }
  @Get()
  findAllEndpoint(@Query('attached') attached: string) {
    const filter: NewFilter = {
      ...(attached && {
        attached: attached == 'true' ? true : false,
      }),
    };

    return this.newsService.findAll(filter);
  }

  @Delete(':id')
  async deleteNewEndpoint(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.deleteNew(id);
  }

  @Put(':id')
  async updateNewEndpoint(
    @Param('id') id: string,
    @Body() newData: CreateNewDTO,
  ) {
    return this.newsService.editNew(Number(id), newData);
  }

  @Get(':id')
  async findOneEndpoint(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }
}
