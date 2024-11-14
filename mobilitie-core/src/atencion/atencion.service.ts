import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateHorarioDireccionDTO } from './dto/atencion.dto';

@Injectable()
export class HorariosDireccionesAtencionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHorarioDireccionDTO) {
      try {
          const newHorarioDireccion = await this.prisma.horarios_direcciones_atencion.create({
              data: {
                  titulo: data.titulo,
                  direccion: data.direccion,
                  tipo: data.tipo,
                  horario: data.horario,
                  pertenece: data.pertenece
              },
          });
          if (!newHorarioDireccion) {
              throw new InternalServerErrorException(
                  'No se pudo guardar la información en horarios_direcciones_atencion',
              );
          }
          return newHorarioDireccion;
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException(
              'Ocurrió un error al crear el registro',
          );
      }
  }

  async findAll() {
      try {
          return await this.prisma.horarios_direcciones_atencion.findMany();
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException(
              'Ocurrió un error al obtener los registros',
          );
      }
  }

  async findOne(id: number) {
      const horarioDireccion = await this.prisma.horarios_direcciones_atencion.findUnique({
          where: { id },
      });
      if (!horarioDireccion) {
          throw new NotFoundException(`Registro con ID ${id} no encontrado`);
      }
      return horarioDireccion;
  }

  async remove(id: number) {
      try {
          const deletedHorarioDireccion = await this.prisma.horarios_direcciones_atencion.delete({
              where: { id },
          });
          return {
              message: 'Registro eliminado correctamente',
              data: deletedHorarioDireccion,
          };
      } catch (error) {
          console.error(error);
          if (error instanceof NotFoundException) {
              throw error;
          }
          throw new InternalServerErrorException(
              'Error eliminando el registro',
          );
      }
  }

  async update(id: number, data: CreateHorarioDireccionDTO) {
      try {
          const horarioDireccionExists = await this.prisma.horarios_direcciones_atencion.findUnique({
              where: { id },
          });

          if (!horarioDireccionExists) {
              throw new NotFoundException(`Registro con ID ${id} no encontrado`);
          }

          const updatedHorarioDireccion = await this.prisma.horarios_direcciones_atencion.update({
              where: { id },
              data: {
                  titulo: data.titulo,
                  direccion: data.direccion,
                  horario: data.tipo,
              },
          });

          if (!updatedHorarioDireccion) {
              throw new InternalServerErrorException(
                  'No se pudo actualizar la información en horarios_direcciones_atencion',
              );
          }
          return updatedHorarioDireccion;
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException(
              'Ocurrió un error al actualizar el registro',
          );
      }
  }
}
