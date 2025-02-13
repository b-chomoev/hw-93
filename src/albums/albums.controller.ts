import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAllAlbums(@Query('artist') artistId: string) {
    if (artistId) {
      const artistAlbum = await this.albumModel.find({ artist: artistId });
      return artistAlbum;
    }
    return this.albumModel.find();
  }

  @Get(':id')
  async getOneAlbum(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const artist = await this.artistModel.findById(albumDto.artist);
    if (!artist) throw new NotFoundException('Artist not found');
    const newAlbum = new this.albumModel({
      name: albumDto.name,
      artist: albumDto.artist,
      date: new Date().getFullYear(),
      image: file && file.filename ? '/uploads/albums/' + file.filename : null,
    });
    return await newAlbum.save();
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const deletedAlbum = await this.albumModel.findByIdAndDelete(id);
    return { message: 'Album deleted', deletedAlbum };
  }
}
