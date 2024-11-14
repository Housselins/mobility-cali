 import { Module } from "@nestjs/common";
 import { EntidadesService } from "./entidades.service";
 import { EntidadesController } from "./entidades.controller";
 import { PrismaService } from "src/shared";
 
 @Module({
   controllers: [EntidadesController],
   providers: [EntidadesService, PrismaService],
 })
 export class EntidadesModule {}