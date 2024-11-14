import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { EnteService } from './ente.service';

@Controller('ente')
export class EnteController {
    constructor(private enteService: EnteService) {}

    @Post()
    createEnteEndpoint(@Body() infoData: any) {
        return this.enteService.createEnte(infoData);
    }

    @Get()
    findAllEndpoint() {
        return this.enteService.getEnte();
    }

    @Delete(':id')
    async deleteEnteEndpoint(@Param('id', ParseIntPipe) id: number) {
        return this.enteService.deleteEnte(id);
    }

    @Put(':id')
    async updateEnteEndpoint(@Param('id', ParseIntPipe) id: number, @Body() newData: any) {
        return this.enteService.editEnte(id, newData);
    }

    @Get(':id')
    async findOneEndpoint(@Param('id', ParseIntPipe) id: number) {
        return this.enteService.findOne(id);
    }
}
    