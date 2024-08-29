import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateNewDTO } from './dto/new.dto';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async createNew(newData: CreateNewDTO) {
    try {
      const createNewResult = await this.prismaService.new.create({
        data: {
          title: newData.title,
          content: newData.content,
          image: newData.image,
        },
      });
      console.log(createNewResult);

      if (!createNewResult) {
        throw new InternalServerErrorException('No se pudo crear la noticia');
      }
      return createNewResult;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const allNews = await this.prismaService.new.findMany();
      if (allNews.length == 0) {
        throw new NotFoundException('No se encontraron noticias');
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
