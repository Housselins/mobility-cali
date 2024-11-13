import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../shared';
  import { CreateInfoDTO } from './dto/info.dto';

  @Injectable()
  export class InfoService {
    constructor(private prisma: PrismaService) {}

    async getInfo(): Promise<CreateInfoDTO[]> {
      try {
        const info = await this.prisma.info.findMany();

        if(info.length == 0) {
          throw new NotFoundException('No se encontraron informaciones');
        }

        return info;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async createInfo(info: CreateInfoDTO): Promise<CreateInfoDTO> {
      try {
        console.log('unfo',info);
        
        const createInfoResult = await this.prisma.info.create({
          data: {
            title: info.title,
            contenido_info: info.contenido_info,
            image: info.image,
          },
        });
        if (!createInfoResult) {
          throw new InternalServerErrorException('No se pudo crear la informacion');
        }
        return createInfoResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async editInfo(id: number, info: CreateInfoDTO): Promise<CreateInfoDTO> {
      try {
        // Verificar si la informacion existe antes de intentar editarla
        const infoExists = await this.prisma.info.findUnique({
          where: { id },
        })

        if (!infoExists) {
          throw new NotFoundException(`Informacion con ID ${id} no encontrada`);
        }

        const editInfoResult = await this.prisma.info.update({
          where: { id },
          data: {
            title: info.title,
            contenido_info: info.contenido_info,
            image: info.image,
          },
        });
        if (!editInfoResult) {
          throw new InternalServerErrorException('No se pudo editar la informacion');
        }
        return editInfoResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async deleteInfo(id: number): Promise<CreateInfoDTO> {
      try {
        // Verificar si la informacion existe antes de intentar eliminarla
        const infoExists = await this.prisma.info.findUnique({
          where: { id },
        })

        if (!infoExists) {
          throw new NotFoundException(`Informacion con ID ${id} no encontrada`);
        }

        const deleteInfoResult = await this.prisma.info.delete({
          where: { id },
        });

        if (!deleteInfoResult) {
          throw new InternalServerErrorException('No se pudo eliminar la informacion');
        }

        return deleteInfoResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async findOne(id: number): Promise<CreateInfoDTO> {
      try {
        const info = await this.prisma.info.findUnique({
          where: { id },
        })
        if (!info) {
          throw new NotFoundException(`Informacion con ID ${id} no encontrada`);
        }

        return info;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

  }