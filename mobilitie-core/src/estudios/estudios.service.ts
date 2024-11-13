import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class EstudiosService {
    constructor(private prisma: PrismaService) {}

    async getEstudios() {
        try {
           const estudios = await this.prisma.estudios.findMany();

            if (estudios.length == 0) {
                throw new NotFoundException();
            }

            return estudios;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getEstudio(id: number) {
        try {
            const estudio = await this.prisma.estudios.findUnique({
                where: { id },
            });
            if (!estudio) {
                throw new NotFoundException();
            }
            return estudio;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }


    async createEstudio(estudio: any) {
        try {
            const createEstudio = await this.prisma.estudios.create({
                data: {
                    titulo: estudio.titulo,
                    descripcion: estudio.descripcion
                }
            });
            if (!createEstudio) {
                throw new InternalServerErrorException();
            }
            return createEstudio;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async updateEstudio(id: number, estudio: any) {
        try {
            const updateEstudio = await this.prisma.estudios.update({
                where: { id },
                data: {
                    titulo: estudio.titulo,
                    descripcion: estudio.descripcion
                }
            });
            if (!updateEstudio) {
                throw new InternalServerErrorException();
            }
            return updateEstudio;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteEstudio(id: number) {
        try {
            const deleteEstudio = await this.prisma.estudios.delete({
                where: { id },
            });
            if (!deleteEstudio) {
                throw new InternalServerErrorException();
            }
            return deleteEstudio;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}