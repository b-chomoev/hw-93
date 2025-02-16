import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtistDto } from './create-artist.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {
  }

  @Get()
  getAllArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOneArtist(@Param('id') id: string) {
    const artist = await this.artistModel.findOne({ _id: id });

    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const image =
      file && file.filename ? '/uploads/artists/' + file.filename : null;
    const newArtist = new this.artistModel({
      name: artistDto.name,
      description: artistDto.description,
      image: image,
    });

    return await newArtist.save();
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteArtist(@Param('id') id: string) {
    const artist = await this.artistModel.findByIdAndDelete(id);

    if (!artist) throw new NotFoundException('Artist not found');

    return { message: 'Artist deleted', artist };
  }
}
