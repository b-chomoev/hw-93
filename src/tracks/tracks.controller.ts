import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAllTracks(@Query('album') trackId: string) {
    if (trackId) {
      const trackAlbum = await this.trackModel.find({ album: trackId });
      return trackAlbum;
    }
    return this.trackModel.find();
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const album = await this.albumModel.findById(trackDto.album);
    if (!album) throw new NotFoundException('Album not found');
    const newTrack = new this.trackModel({
      name: trackDto.name,
      album: trackDto.album,
      duration: trackDto.duration,
      track_number: trackDto.track_number,
    });
    return await newTrack.save();
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    return { message: 'Track deleted', deletedTrack };
  }
}
