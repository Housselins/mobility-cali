import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import  { EntidadesService } from './entidades.service';
@Controller('entidades') 
export class EntidadesController {

    constructor(private entidadesService: EntidadesService) {}
    
    @Post()
    createEntidad(@Body() infoEntidad: any) {
        return  this.entidadesService.createEntidad(infoEntidad);
    }

    @Get()
    async getEntidades() {
        return  this.entidadesService.getEntidades(); 
    }

    @Get(':id')
    async getEntidad(@Param('id', ParseIntPipe) id: number) {
        return  this.entidadesService.findOne(id);
    }

    @Delete(':id')
    async deleteEntidad(@Param('id', ParseIntPipe) id: number) {
        return  this.entidadesService.deleteEntidad(id);
    }

    @Put(':id')
    async updateEntidad(@Param('id', ParseIntPipe) id: number, @Body() infoEntidad: any) {
        return  this.entidadesService.EditEntidad(id, infoEntidad);
    }


}