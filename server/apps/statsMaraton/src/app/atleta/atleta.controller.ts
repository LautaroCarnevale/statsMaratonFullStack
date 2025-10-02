import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { GetAtletaResponseDto } from './dto/get-atleta-response.dto';

@Controller('atleta')
export class AtletaController {
  constructor(private readonly atletaService: AtletaService) { }

  @Post()
  create(@Body() createAtletaDto: CreateAtletaDto) {
    return this.atletaService.create(createAtletaDto);
  }

  @Get()
  findAll(): Promise<GetAtletaResponseDto[]> {
    return this.atletaService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(id, updateAtletaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atletaService.remove(id);
  }
}
