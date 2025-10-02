import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AtletaDocument = HydratedDocument<Atleta>;

@Schema({ collection: 'atletas', timestamps: true })
export class Atleta {
  @Prop({ type: Number, required: true, unique: true })
  dni!: number;

  @Prop({ type: String, required: true, trim: true })
  nombre!: string;

  @Prop({ type: String, required: true })
  tiempo!: string; 

  @Prop({ type: Number, required: true })
  posicion!: number;

  @Prop({ type: String, ref: 'Ciudad', required: true })
  ciudadId!: string;
}

export const AtletaSchema = SchemaFactory.createForClass(Atleta);
