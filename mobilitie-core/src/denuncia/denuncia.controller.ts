import { Body, Controller, Get, HttpException, HttpStatus, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DenunciaService } from './denuncia.service';


@Controller('denuncia')
export class DenunciaController {
    
    constructor(private denunciaService: DenunciaService) {}

    @Post()
    createDenuncia(@Body() denunciaData: any) {
        return this.denunciaService.createDenuncia(denunciaData);
    }

}