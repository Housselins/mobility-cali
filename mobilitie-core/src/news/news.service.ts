import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateNewDTO, NewFilter } from './dto/new.dto';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async createNew(newData: CreateNewDTO) {
    try {
      const pdf = {
        ...(newData.file && { file: newData.file }),
      };
      const pdfDesc = {
        ...(newData.fileDescription && {
          fileDescription: newData.fileDescription,
        }),
      };
      const fileName = {
        ...(newData.fileName && {
          fileName: newData.fileName,
        }),
      };

      if (newData.id) {
        const update = await this.prismaService.new.update({
          where: { id: newData.id },
          data: {
            attached: newData.attached,
            title: newData.title,
            contenido_noticia: newData.contenido_noticia,
            image: newData.image,
            ...(pdf && { ...pdf }),
            ...(fileName && { ...fileName }),
            ...(pdfDesc && { ...pdfDesc }),
          },
        });

        if (!update) {
          throw new InternalServerErrorException('No se pudo crear la noticia');
        }
        return update;
      } else {
        const createNewResult = await this.prismaService.new.create({
          data: {
            title: newData.title,
            contenido_noticia: newData.contenido_noticia,
            image: newData.image,
          },
        });

        if (!createNewResult) {
          throw new InternalServerErrorException('No se pudo crear la noticia');
        }
        return createNewResult;
      }
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  async findAll(filter?: NewFilter) {
    try {
      const allNews = await this.prismaService.new.findMany({
        where: { ...filter, isEnabled: true },
      });

      if (allNews.length == 0) {
        throw new NotFoundException('No se encontraron noticias');
      }
      return allNews;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteNew(id: number) {
    console.log('ID de noticia a eliminar desde el servicio:', id);
    try {
      // Verificar si la noticia existe antes de intentar eliminarla
      const newsExists = await this.prismaService.new.findUnique({
        where: { id },
      });

      if (!newsExists) {
        throw new NotFoundException(`Noticia con ID ${id} no encontrado`);
      }

      // Eliminar la noticia
      const deletedNews = await this.prismaService.new.delete({
        where: { id },
      });

      return deletedNews;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw error; // Re-lanzar la excepción NotFoundException si la noticia no existe
      }
      throw new InternalServerErrorException(
        'Error al intentar eliminar la noticia',
      );
    }
  }

  async editNew(id: number, newData: CreateNewDTO) {
    try {
      // Verificar si la noticia existe antes de intentar editarla
      const newsExists = await this.prismaService.new.findUnique({
        where: { id },
      });

      if (!newsExists) {
        throw new NotFoundException(`Noticia con ID ${id} no encontrado`);
      }

      // Editar la noticia
      const editedNews = await this.prismaService.new.update({
        where: { id },
        data: {
          title: newData.title,
          contenido_noticia: newData.contenido_noticia,
          image: newData.image,
        },
      });

      return editedNews;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw error; // Re-lanzar la excepción NotFoundException si la noticia no existe
      }
      throw new InternalServerErrorException(
        'Error al intentar editar la noticia',
      );
    }
  }

  async findOne(id: number) {
    try {
      const news = await this.prismaService.new.findUnique({
        where: { id },
      });
      if (!news) {
        throw new NotFoundException(`Noticia con ID ${id} no encontrado`);
      }
      return news;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw error; // Re-lanzar la excepción NotFoundException si la noticia no existe
      }
      throw new InternalServerErrorException(
        'Error al intentar encontrar la noticia',
      );
    }
  }
}
