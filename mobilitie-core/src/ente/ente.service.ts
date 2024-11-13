import {
    Injectable,
    InternalServerErrorException, 
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/shared';


  
  @Injectable()
  export class EnteService{
    constructor(private prisma: PrismaService) {}

    async getEnte(): Promise<any[]> {
      try {
        const ente = await this.prisma.ente.findMany({
          where: {isEnabled: true}
        });

        if(ente.length == 0) {
          throw new NotFoundException('No se encontraron entes');
        }

        return ente;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async createEnte(ente: any): Promise<any> {
      try {
        console.log('ente',ente);
        
        const createEnteResult = await this.prisma.ente.create({
          data: {
            alt: ente.alt,
            image: ente.image,
            url: ente.url
          },
        });
        if (!createEnteResult) {
          throw new InternalServerErrorException('No se pudo crear el ente');
        }
        return createEnteResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async editEnte(id: number, ente: any): Promise<any> {
      try {
        // Verificar si la informacion existe antes de intentar editarla
        const enteExists = await this.prisma.ente.findUnique({
          where: { id },
        })

        if (!enteExists) {
          throw new NotFoundException(`Ente con ID ${id} no encontrada`);
        }

        const editEnteResult = await this.prisma.ente.update({
          where: { id },
          data: {
            alt: ente.alt,
            image: ente.image,
            url: ente.url
          },
        });
        if (!editEnteResult) {
          throw new InternalServerErrorException('No se pudo editar el ente');
        }
        return editEnteResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async deleteEnte(id: number): Promise<any> {
      try {
        // Verificar si la informacion existe antes de intentar eliminarla
        const enteExists = await this.prisma.ente.findUnique({
          where: { id },
        })

        if (!enteExists) {
          throw new NotFoundException(`Ente con ID ${id} no encontrada`);
        }

        const deleteEnteResult = await this.prisma.ente.update({
          where: { id },
          data: {
            isEnabled: false,
          },
        });

        if (!deleteEnteResult) {
          throw new InternalServerErrorException('No se pudo eliminar el ente');
        }

        return deleteEnteResult;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    async findOne(id: number): Promise<any> {
      try {
        const ente = await this.prisma.ente.findUnique({
          where: { id },
        })
        if (!ente) {
          throw new NotFoundException(`Ente con ID ${id} no encontrada`);
        }

        return ente;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }