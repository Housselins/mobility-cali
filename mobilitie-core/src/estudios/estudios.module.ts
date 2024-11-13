import { Module } from "@nestjs/common";
import { EstudiosService } from "./estudios.service";
import { EstudiosController } from "./estudios.controller";
import { PrismaService } from "src/shared";

@Module({   
    controllers: [EstudiosController],
    providers: [EstudiosService, PrismaService],
})
export class EstudiosModule {}