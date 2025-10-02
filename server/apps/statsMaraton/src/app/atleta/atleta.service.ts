import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Atleta } from './schemas/atleta.schemas';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

@Injectable()
export class AtletaService {
  constructor(@InjectModel(Atleta.name) private atletaModel: Model<Atleta>) { }

  async create(createAtletaDto: CreateAtletaDto) {
    // valida que no exita por dni
    const isExistByDni = await this.atletaModel.findOne({ dni: createAtletaDto.dni });
    if (isExistByDni) throw new BadRequestException('Atleta ya registrado');

    const atleta = await this.atletaModel.create(createAtletaDto);
    if (!atleta) throw new BadRequestException('Atleta no creado');
    return `Atleta ${atleta.dni} creado`;
  }

  async findAll() {
    const docs = await this.atletaModel
      .find()
      .populate<{ ciudadId: { nombre: string } }>('ciudadId')
      .lean()
      .exec();

    if (!docs) throw new BadRequestException('Atletas no encontrados');


    return docs.map(d => ({
      id: d._id,
      dni: d.dni,
      nombre: d.nombre,
      tiempo: d.tiempo,
      posicion: d.posicion,
      ciudad: d.ciudadId.nombre ?? null,
    }));
  }

  async update(id: string, updateAtletaDto: UpdateAtletaDto) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    const atleta = await this.atletaModel.findByIdAndUpdate(id, updateAtletaDto, { new: true, runValidators: true }).exec();
    if (!atleta) throw new BadRequestException('Atleta no encontrado');

    return `Atleta ${atleta.dni} actualizado`;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    const deleted = await this.atletaModel.findByIdAndDelete(id);
    if (!deleted) throw new BadRequestException('Atleta no encontrado');
    return `Atleta ${deleted.dni} eliminado`;
  }
}
