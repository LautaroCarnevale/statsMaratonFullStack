import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { AtletaModule } from './atleta/atleta.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || ''),CiudadModule, AtletaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
