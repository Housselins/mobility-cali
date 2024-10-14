import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdatePageDto } from './dto/page.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':title')
  find(@Param('title') title: string) {
    return this.pageService.find(title);
  }

  @Post()
  createOrUpdate(@Body() page: UpdatePageDto) {
    return this.pageService.createOrUpdate(page);
  }
}
