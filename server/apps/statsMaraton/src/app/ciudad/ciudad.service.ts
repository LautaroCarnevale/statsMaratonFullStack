import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ciudad } from './schemas/ciudad.schema';
import { Types } from 'mongoose';
@Injectable()
export class CiudadService {
  constructor(@InjectModel(Ciudad.name) private ciudadModel: Model<Ciudad>) { }


  create(createCiudadDto: CreateCiudadDto) {
    return this.ciudadModel.create(createCiudadDto);
  }


  findAll() {
    const ciudades = this.ciudadModel.find();
    return ciudades;
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }

    const updated = await this.ciudadModel
      .findByIdAndUpdate(id, updateCiudadDto, { new: true, runValidators: true }).exec();

    if (!updated) throw new NotFoundException('Ciudad no encontrada');

    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');

    const deleted = await this.ciudadModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Ciudad no encontrada');
    
    return `This action removes a #${id} ciudad`;
  }
}
