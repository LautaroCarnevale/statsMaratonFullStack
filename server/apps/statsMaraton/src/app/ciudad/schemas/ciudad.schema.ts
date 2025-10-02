import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CiudadDocument = HydratedDocument<Ciudad>;

@Schema({ collection: 'ciudades', timestamps: true })
export class Ciudad {
  @Prop({ type: String, required: true, trim: true })
  nombre!: string;
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);
