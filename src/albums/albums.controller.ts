import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

}
