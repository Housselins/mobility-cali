import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../shared';


@Injectable()
export class FuncionarioService {

    constructor(
        private prisma: PrismaService,
    ) { }

    async createFuncionario(funcionario: any): Promise<any> {
        try {
            const createFuncionarioResult = await this.prisma.funcionario.create({
                data: {
                    direccion: funcionario.direccion,
                    correo: funcionario.correo,
                    cargo: funcionario.cargo,
                    telefono: funcionario.telefono,
                    nombre: funcionario.nombre,
                    image: funcionario.image,
                    link: funcionario.link,
                },
            });
            if (!createFuncionarioResult) {
                throw new InternalServerErrorException('No se pudo crear el funcionario');
            }
            return createFuncionarioResult;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async editFuncionario(id: number, funcionario: any): Promise<any> {
        try {
            const updateFuncionarioResult = await this.prisma.funcionario.update({
                where: { id },
                data: {
                    direccion: funcionario.direccion,
                    correo: funcionario.correo,
                    cargo: funcionario.cargo,
                    telefono: funcionario.telefono,
                    nombre: funcionario.nombre,
                    image: funcionario.image,
                    link: funcionario.link,
                },
            });
            if (!updateFuncionarioResult) {
                throw new InternalServerErrorException('No se pudo actualizar el funcionario');
            }
            return updateFuncionarioResult;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<any[]> {
        try {
            const funcionarios = await this.prisma.funcionario.findMany();

            if (funcionarios.length == 0) {
                throw new NotFoundException('No se encontraron funcionarios');
            }
            return funcionarios;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number): Promise<any> {
        try {
            const funcionario = await this.prisma.funcionario.findUnique({
                where: { id },
            });
            if (!funcionario) {
                throw new NotFoundException(`Funcionario con ID ${id} no encontrado`);
            }
            return funcionario;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteFuncionario(id: number): Promise<any> {
        try {
            const funcionario = await this.prisma.funcionario.findUnique({
                where: { id },
            });
            if (!funcionario) {
                throw new NotFoundException(`Funcionario con ID ${id} no encontrado`);
            }
            const deleteFuncionario = await this.prisma.funcionario.delete({
                where: { id }
            });

            if (!deleteFuncionario) {
                throw new InternalServerErrorException('No se pudo eliminar el funcionario');
            }
            return deleteFuncionario;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


}