import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateBannerDTO } from './dto/banner.dto';


  @Injectable()
  export class BannerService {
    constructor(private prismaService: PrismaService) {}

    async createBanner(bannerData: CreateBannerDTO) {
      try {
        console.log('bannerData',bannerData);
        
        const createBannerResult = await this.prismaService.banner.create({
          data:{
            image: bannerData.image,
            alt: bannerData.alt
          }
        });
        if (!createBannerResult) {
          throw new InternalServerErrorException(
            'No se pudo crear el banner',
          );
        }
        return createBannerResult;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    async findAll() {
      try {
        const allBanners = await this.prismaService.banner.findMany();
  
        if (allBanners.length == 0) {
          throw new NotFoundException('No se encontraron banners');
        }
        return allBanners;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    async deleteBanner(id: number) {
      try {
        // Verificar si el banner existe antes de intentar eliminarlo
        const bannerExists = await this.prismaService.banner.findUnique({
          where: { id },
        });
    
        if (!bannerExists) {
          throw new NotFoundException(`Banner con ID ${id} no encontrado`);
        }
    
        // Eliminar el banner
        const deletedBanner = await this.prismaService.banner.delete({
          where: { id },
        });
    
        return deletedBanner;
      } catch (error) {
        console.error(error);
        if (error instanceof NotFoundException) {
          throw error; // Re-lanzar la excepción NotFoundException si el banner no existe
        }
        throw new InternalServerErrorException(
          'Error al intentar eliminar el banner'
        );
      }
    }
  }