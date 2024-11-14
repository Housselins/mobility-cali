import { Body, Controller, Get, HttpException, HttpStatus, Post, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { HorariosDireccionesAtencionService } from './atencion.service';
import { CreateHorarioDireccionDTO } from './dto/atencion.dto';

@Controller('horariosdirecciones')
export class HorariosDireccionesAtencionController {
    
    constructor(private horariosDireccionesAtencionService: HorariosDireccionesAtencionService) {}

    @Post()
    createHorarioDireccion(@Body() horarioDireccionData: CreateHorarioDireccionDTO) {
        return this.horariosDireccionesAtencionService.create(horarioDireccionData);
    }

    @Get()
    getHorariosDirecciones() {
        return this.horariosDireccionesAtencionService.findAll();
    }

    @Get(':id')
    async getHorarioDireccion(@Param('id', ParseIntPipe) id: number) {
        const horarioDireccion = await this.horariosDireccionesAtencionService.findOne(id);
        if (!horarioDireccion) {
          throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
        }
        return horarioDireccion;
    }

    @Delete(':id')
    async deleteHorarioDireccion(@Param('id', ParseIntPipe) id: number) {
      try {
        const deletedHorarioDireccion = await this.horariosDireccionesAtencionService.remove(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Registro eliminado correctamente',
          data: deletedHorarioDireccion,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Error eliminando el registro',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Put(':id')
    async updateHorarioDireccion(@Param('id') id: string, @Body() newData: CreateHorarioDireccionDTO) {
      return this.horariosDireccionesAtencionService.update(Number(id), newData);
    }
} 