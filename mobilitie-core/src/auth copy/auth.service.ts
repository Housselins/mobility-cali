import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/shared';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async login(usuario: User): Promise<{ access_token: string; user: any }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: usuario.email },
        include: { rol: true },
      });
      console.log('este es', user);

      if (!user || usuario.password !== user.password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      await this.prisma.loginHistory.create({
        data: {
          userId: user.id,
          loginTime: new Date(),
        },
      });

      // Generar un token JWT
      const payload = { username: user.email, id: user.id };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          name: user.name,
          email: user.email,
          rol: user.rol,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred during login');
    }
  }
}
