import { Module } from "@nestjs/common";
import { AgremiacionesService } from "./agremiaciones.service";
import { AgremiacionesController } from "./agremiaciones.controller";
import { PrismaService } from "src/shared";

@Module({
    controllers: [AgremiacionesController],
    providers: [AgremiacionesService, PrismaService],
})
export class AgremiacionesModule {}