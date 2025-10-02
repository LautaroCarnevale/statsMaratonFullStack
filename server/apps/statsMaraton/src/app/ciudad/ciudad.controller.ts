import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) { }

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadService.remove(id);
  }
}
