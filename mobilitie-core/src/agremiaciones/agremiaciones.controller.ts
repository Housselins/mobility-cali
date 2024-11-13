import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { AgremiacionesService } from './agremiaciones.service';

@Controller('agremiaciones')
export class AgremiacionesController {
    constructor(private agremiacionesService: AgremiacionesService) {}

    @Get()
    async getAgremiaciones() {
        return await this.agremiacionesService.getAgremiaciones();
    }

    @Get(':id')
    async getAgremiacion(@Param('id', ParseIntPipe) id: number) {
        return await this.agremiacionesService.getAgremiacion(id);
    }

    @Post()
    async createAgremiacion(@Body() agremiacion: any) {
        return await this.agremiacionesService.createAgremiacion(agremiacion);
    }

    @Put(':id')
    async updateAgremiacion(@Param('id', ParseIntPipe) id: number, @Body() agremiacion: any,) {
        return await this.agremiacionesService.updateAgremiacion(id, agremiacion);
    }

    @Delete(':id')
    async deleteAgremiacion(@Param('id', ParseIntPipe) id: number) {
        return await this.agremiacionesService.deleteAgremiacion(id);
    }
}