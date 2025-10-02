import { Module } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AtletaSchema } from './schemas/atleta.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Atleta', schema: AtletaSchema }])],
  controllers: [AtletaController],
  providers: [AtletaService],
})
export class AtletaModule {}
