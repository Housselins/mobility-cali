import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class AgremiacionesService {
    constructor(private prisma: PrismaService) {}

    async getAgremiaciones() {
        try {
            const agremiaciones = await this.prisma.agremiaciones.findMany();
            
            if(agremiaciones.length == 0) {
                throw new NotFoundException('No se encontraron agremiaciones');
            }
            return agremiaciones;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getAgremiacion(id: number) {
        try {
            const agremiacion = await this.prisma.agremiaciones.findUnique({
                where: { id },
            });
            if (!agremiacion) {
                throw new NotFoundException(`Agremiacion con ID ${id} no encontrada`);
            }
            return agremiacion;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async createAgremiacion(agremiacion: any) {
        try {
            const createAgremiacion = await this.prisma.agremiaciones.create({
                data: {
                    nombre: agremiacion.nombre,
                    direccion: agremiacion.direccion,
                    correo: agremiacion.correo,
                    telefono: agremiacion.telefono,
                }
            });
            if (!createAgremiacion) {
                throw new InternalServerErrorException();
            }
            return createAgremiacion;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async updateAgremiacion(id: number, agremiacion: any) {
        try {
            const updateAgremiacion = await this.prisma.agremiaciones.update({
                where: { id },
                data: {
                    nombre: agremiacion.nombre,
                    direccion: agremiacion.direccion,
                    correo: agremiacion.correo,
                    telefono: agremiacion.telefono,
                }
            });
            if (!updateAgremiacion) {
                throw new InternalServerErrorException();
            }
            return updateAgremiacion;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteAgremiacion(id: number) {
        try {
            const deleteAgremiacion = await this.prisma.agremiaciones.delete({
                where: { id },
            });
            if (!deleteAgremiacion) {
                throw new InternalServerErrorException();
            }
            return deleteAgremiacion;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}