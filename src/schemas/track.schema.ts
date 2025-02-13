import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  name: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Album is required'],
  })
  album: string;
  @Prop({ default: null })
  duration: string;
  @Prop({ required: true })
  track_number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
