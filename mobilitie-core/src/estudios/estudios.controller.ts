import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { EstudiosService } from './estudios.service';

@Controller('estudios')
export class EstudiosController {
    constructor(private estudiosService: EstudiosService) {}

    @Get()
    async getEstudios() {
        return await this.estudiosService.getEstudios();
    }

    @Get(':id')
    async getEstudio(@Param('id', ParseIntPipe) id: number) {
        return await this.estudiosService.getEstudio(id);
    }

    @Post()
    async createEstudio(@Body() estudio: any) {
        return await this.estudiosService.createEstudio(estudio);
    }

    @Put(':id')
    async updateEstudio(@Param('id', ParseIntPipe) id: number, @Body() estudio: any) {
        return await this.estudiosService.updateEstudio(id, estudio);
    }

    @Delete(':id')
    async deleteEstudio(@Param('id', ParseIntPipe) id: number) {
        return await this.estudiosService.deleteEstudio(id);
    }
}