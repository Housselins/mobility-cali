import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDTO } from './dto/info.dto';

@Controller('info')
export class InfoController {
    constructor(private infoService: InfoService) { }
    
    @Post()
    createInfoEndpoint(@Body() infoData: CreateInfoDTO) {
        return this.infoService.createInfo(infoData);
    }

    @Get()
    findAllEndpoint() {
        return this.infoService.getInfo();
    }

    @Delete(':id')
    async deleteInfoEndpoint(@Param('id', ParseIntPipe) id: number) {
        return this.infoService.deleteInfo(id);
    }

    @Put(':id')
    async updateInfoEndpoint(@Param('id') id: string, @Body() newData: CreateInfoDTO) {
        return this.infoService.editInfo(Number(id), newData);
    }

    @Get(':id')
    async findOneEndpoint(@Param('id', ParseIntPipe) id: number) {
        return this.infoService.findOne(id);
    }
}