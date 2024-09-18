import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { CreateDenunciaDTO } from './dto/denuncia.dto';


@Injectable()
export class DenunciaService {
  constructor(private prismaService: PrismaService) { }

  async createDenuncia(denunciaData: any) {
    try {
      console.log('denunciaData', denunciaData);
      const createDenunciante = await this.prismaService.denunciante.create({
        data: {
          nombre: denunciaData.denunciante.nombreDenunciante,
          apellido: denunciaData.denunciante.apellidoDenunciante,
          numeroIdentificacion: denunciaData.denunciante.numeroIdentificacion,
          sexo: denunciaData.denunciante.sexo,
          correo: denunciaData.denunciante.correo,
          telefono: denunciaData.denunciante.telefono,
          direccion: denunciaData.denunciante.direccion,
        }
      })

      const createDenunciaResult = await this.prismaService.denuncia.create({
        data: {
          denuncianteId: createDenunciante.id,  // Referencia al denunciante
          servidorInvolucrado: denunciaData.denuncia.nombresApellidos,
          rol: denunciaData.denuncia.camposRol,
          organismo: denunciaData.denuncia.organismo,
          lugarHechos: denunciaData.denuncia.lugarHechos,
          fechaHechos: denunciaData.denuncia.fechaHechos,
          descripcion: denunciaData.denuncia.descripcion,
          createdAt: new Date(),
         
          // Si existe una prueba, crea la relación con la tabla de pruebas
        pruebas: denunciaData.pruebas ? {
          create: {
            evidencia: denunciaData.pruebas.evidencia,
            // Si hay testigos, los asociamos a la prueba
            testigos: {
              create: [
                {
                  nombreCompleto: denunciaData.pruebas.testigo1.nombre,
                  direccion: denunciaData.pruebas.testigo1.direccion,
                  telefono: denunciaData.pruebas.testigo1.telefono,
                  correo: denunciaData.pruebas.testigo1.correo,
                },
                {
                  nombreCompleto: denunciaData.pruebas.testigo2?.nombre || '',
                  direccion: denunciaData.pruebas.testigo2?.direccion || '',
                  telefono: denunciaData.pruebas.testigo2?.telefono || '',
                  correo: denunciaData.pruebas.testigo2?.correo || '',
                },
              ].filter(testigo => testigo.nombreCompleto), // Filtra los testigos vacíos
            },
          },
        } : undefined, // Si no hay pruebas, no crea la relación
        },
      });

      if (!createDenunciaResult) {
        throw new InternalServerErrorException(
          'No se pudo crear la denuncia',
        );
      }
      
      return createDenunciaResult;

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }

  }
}