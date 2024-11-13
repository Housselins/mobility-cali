import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateFooterDTO } from './dto/footer.dto';

@Injectable()
export class FooterService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      //console.log(data);
      const createInFooter = await this.prisma.inFooter.create({
        data:{
          texto: data.texto,
          link: data.link,
          fkIdFooter: parseInt(data.fkIdFooter)
        }
      });
      if (!createInFooter) {
        throw new InternalServerErrorException(
          'No se pudo guardar la informacion en el footer',
        );
      }
      return createInFooter;
    }
    catch(error){
      console.log(error);
      
    }
  }

  async findAll() {
    return this.prisma.footer.findMany({
      include: {
        inFooters: true,  // Esto incluirá los registros relacionados de inFooter
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.inFooter.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    console.log(id);
    
    return this.prisma.inFooter.delete({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    console.log('id', id, 'data', data);
    try {
       const InFooterExists = await this.prisma.inFooter.findUnique({
         where: { id },
       })

       if (!InFooterExists) {
         throw new NotFoundException(`InFooter con ID ${id} no encontrada`)
       }
       const updateInFooter = await this.prisma.inFooter.update({
         where: { id },
         data: {
           texto: data.texto,
           link: data.link,
           fkIdFooter: parseInt(data.fkIdFooter)
         }
       })
       if (!updateInFooter) {
         throw new InternalServerErrorException(
           'No se pudo actualizar la informacion en el footer'
         )
       }
       return updateInFooter
    } catch (error) {
      console.log(error);
    }

  }
}