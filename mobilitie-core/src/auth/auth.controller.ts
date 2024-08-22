import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User} from '@prisma/client'

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService) {}

   
    @Post()
    async login(@Body() usuario: User) {
      try {
        const user = await this.authService.login(usuario);
        return { user };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  

    @Get()
    getUsers() {
        return this.authService.getUsers();
    }
}
