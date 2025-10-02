import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CiudadSchema } from './schemas/ciudad.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ciudad', schema: CiudadSchema }])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
