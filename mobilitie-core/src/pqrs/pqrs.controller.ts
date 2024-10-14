
import { Body, Controller, Get, HttpException, HttpStatus, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PqrsService } from './pqrs.service';
//import { CreatePqrsDTO } from './dto/pqrs.dto';

@Controller('pqrs')
export class PqrsController {
    constructor(private readonly pqrsService: PqrsService) {}

    @Post()
    async createPqrs(@Body() pqrsData: any) {
        return this.pqrsService.cratePqrs(pqrsData);
    }
}