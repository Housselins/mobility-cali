import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';

<<<<<<< HEAD
import { PrismaService } from 'src/shared';
=======
import { PrismaService } from '../shared';
>>>>>>> origin/nuevos_camnbios


@Injectable()
export class PqrsService {
  constructor(private readonly prisma: PrismaService) {}

  async cratePqrs(pqrsData: any) {
    try {
      console.log('pqrsDataDto', pqrsData);
      
      const pqrs = await this.prisma.pqrs.create({
        data: {
          nombres: pqrsData.nombres,
          apellidos: pqrsData.apellidos,
          identificacion: pqrsData.identificacion,
          direccion: pqrsData.direccion,
          correo: pqrsData.correo,
          telefono: pqrsData.telefono,
          tipoSolicitud: pqrsData.tipoSolicitud,
          contenidoSolicitud: pqrsData.contenidoSolicitud,
          dependencia: pqrsData.dependencia,
          pais: pqrsData.pais,
          ciudad: pqrsData.ciudad,
          departamento: pqrsData.departamento,
          image: pqrsData.image,
        },
      });

      if (!pqrs) {
        throw new InternalServerErrorException(
          'No se pudo crear la solicitud',
        );
      }
      return pqrs;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}