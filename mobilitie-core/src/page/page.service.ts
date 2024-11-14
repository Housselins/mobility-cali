import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Page } from '@prisma/client';
<<<<<<< HEAD
import { PrismaService } from 'src/shared';
=======
import { PrismaService } from '../shared';
>>>>>>> origin/nuevos_camnbios
import { UpdatePageDto } from './dto/page.dto';

@Injectable()
export class PageService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(title: string): Promise<Page | undefined> {
    try {
      const page = await this.prismaService.page.findFirst({
        where: { title: title },
      });
      if (!page) {
        throw new HttpException(
          'Stadistis not found for page ' + title,
          HttpStatus.NOT_FOUND,
        );
      }
      return page;
    } catch (error) {
      throw error;
    }
  }

  async createOrUpdate(page: UpdatePageDto): Promise<Page> {
    try {
      // ==================== VALIDATE IF THE PAGE EXIST ====================
      const findPage = await this.find(page.title).catch((error) => {});
      // ==================== CREATE PAGE ====================
      if (!findPage) {
        const now = new Date(Date.now());
        const dateSet = new Date(now.getTime() - 5 * 3600000);
        const createdPage = await this.prismaService.page.create({
          data: {
            title: page.title,
            createdAt: dateSet,
            updatedAt: dateSet,
            version: '1',
            views: '1',
          },
        });

        return createdPage;
      }
      // ==================== UPDATE PAGE ====================
      let attempt = 0;
      while (attempt < 10) {
        try {
          const now = new Date(Date.now());
          const dateSet = new Date(now.getTime() - 5 * 3600000);

          const updatedPage = await this.prismaService.page.update({
            where: { id: findPage.id, version: findPage.version }, // Version is used to avoid concurrency issues
            data: {
              ...findPage,
              ...(page.views && {
                views: (parseInt(findPage.views) + 1).toString(),
              }),
              ...(page.updatedAt && { updatedAt: dateSet }),
              version: (parseInt(findPage.version) + 1).toString(),
            },
          });

          return updatedPage;
        } catch (error) {
          attempt++;
          if (attempt === 10) {
            throw error;
          }
          continue;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
