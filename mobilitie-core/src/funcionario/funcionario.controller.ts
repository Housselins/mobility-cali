import { Body, Controller, Get, Post, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

@Controller('funcionario')
export class FuncionarioController {
    constructor(    
        private funcionarioService: FuncionarioService,
    ) {}

    @Get()
    async findAll() {
        return this.funcionarioService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.funcionarioService.findOne(id);
    }

    @Post()
    async createFuncionario(@Body() data: any) {
        return this.funcionarioService.createFuncionario(data);
    }

    @Delete(':id')
    async deleteFuncionario(@Param('id', ParseIntPipe) id: number) {
        return this.funcionarioService.deleteFuncionario(id);
    }

    @Put(':id')
    async updateFuncionario(@Param('id') id: string, @Body() newData: any) {
        return this.funcionarioService.editFuncionario(Number(id), newData);
    }
}