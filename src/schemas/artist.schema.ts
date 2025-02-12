import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ default: null })
  image: string;
  @Prop({ default: null })
  description: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
