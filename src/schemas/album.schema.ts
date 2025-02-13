import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Artist is required'],
  })
  artist: Artist;
  @Prop({ required: true })
  date: number;
  @Prop({ default: null })
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
