import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';


@Injectable()
export class EntidadesService {
    constructor(private prisma: PrismaService) { }

    async getEntidades(): Promise<any[]> {
        try {
            const entidades = await this.prisma.entidades_relacionadas.findMany();

            if (entidades.length == 0) {
                throw new NotFoundException('No se encontraron entidades relacionadas');
            }

            return entidades;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async createEntidad(entidad: any): Promise<any> {
        try {
            const createEntidadResult = await this.prisma.entidades_relacionadas.create({
                data: {
                    nombre: entidad.nombre,
                    url: entidad.url
                },
            });

            if (!createEntidadResult) {
                throw new InternalServerErrorException('No se pudo crear la entidad relacionada');
            }

            return createEntidadResult;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async EditEntidad(id: number, entidad: any): Promise<any> {
        try {
            // Verificar si la informacion existe antes de intentar editarla
            const entidadExists = await this.prisma.entidades_relacionadas.findUnique({
                where: { id },
            })

            if (!entidadExists) {
                throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
            }

            const editEntidadResult = await this.prisma.entidades_relacionadas.update({
                where: { id },
                data: {
                    nombre: entidad.nombre,
                    url: entidad.url
                },
            });
            if (!editEntidadResult) {
                throw new InternalServerErrorException('No se pudo editar la entidad relacionada');
            }
            return editEntidadResult;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteEntidad(id: number): Promise<any> {
        try {
            // Verificar si la informacion existe antes de intentar eliminarla
            const entidadExists = await this.prisma.entidades_relacionadas.findUnique({
                where: { id },
            })

            if (!entidadExists) {
                throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
            }

            const deleteEntidadResult = await this.prisma.entidades_relacionadas.delete({
                where: { id },
            });

            if (!deleteEntidadResult) {
                throw new InternalServerErrorException('No se pudo eliminar la entidad relacionada');
            }
            return deleteEntidadResult;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number): Promise<any> {
        try {
            const entidad = await this.prisma.entidades_relacionadas.findUnique({
                where: { id },
            })
            if (!entidad) {
                throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
            }

            return entidad;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

}