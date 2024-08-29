import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/shared/services/prisma.module';
import { JwtModule } from '@nestjs/jwt'; // Importa JwtModule

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule,
    JwtModule.register({
      secret: 'kqjmE+eN#@PT6e8m', 
      signOptions: { expiresIn: '7h' }, 
    }),

  ],
})
export class AuthModule {}
