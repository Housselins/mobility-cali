import { Body, Controller, Get, HttpException, HttpStatus, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDTO } from './dto/banner.dto';

@Controller('banner')
export class BannerController {
    
    constructor(private bannerService: BannerService) {}

    @Post()
    createBanner(@Body() bannerData: CreateBannerDTO) {
        return this.bannerService.createBanner(bannerData);
    }

    @Get()
    getBanners() {
        return this.bannerService.findAll();
    }

    @Delete(':id')
    async deleteBanner(@Param('id', ParseIntPipe) id: number) {
      try {
        const deletedBanner = await this.bannerService.deleteBanner(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Banner eliminado correctamente',
          data: deletedBanner,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Error eliminando el banner',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
   
}