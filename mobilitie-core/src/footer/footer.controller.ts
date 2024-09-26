import { Body, Controller, Get, HttpException, HttpStatus, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { FooterService } from './footer.service';
import { CreateFooterDTO } from './dto/footer.dto';

@Controller('footer')
export class FooterController {
    
    constructor(private footerService: FooterService) {}

    @Post()
    createFooter(@Body() footerData: CreateFooterDTO) {
        return this.footerService.create(footerData);
    }

    @Get()
    getFooters() {
        return this.footerService.findAll();
    }

    @Delete(':id')
    async deleteFooter(@Param('id', ParseIntPipe) id: number) {
      try {
        const deletedFooter = await this.footerService.remove(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Link eliminado correctamente',
          data: deletedFooter,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Error eliminando el link',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
   
}