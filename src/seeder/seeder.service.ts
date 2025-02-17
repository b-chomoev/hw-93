import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async seed() {
    console.log('Start making fixtures');

    await this.artistModel.deleteMany({});
    await this.albumModel.deleteMany({});
    await this.trackModel.deleteMany({});
    await this.userModel.deleteMany({});

    console.log('Collections of mongodb was cleared');

    const [future, levanGorozia] = await this.artistModel.create(
      {
        name: 'Future',
        description: 'Future is American Rap Artist.',
        image: 'fixtures/future.png',
      },
      {
        name: 'Levan Gorozia',
        description: 'Levan Gorozia is Georgian Rap Artist.',
        image: 'fixtures/levan.png',
      },
    );

    const [highOffLife, futureAlbum, rassvet, alpha] =
      await this.albumModel.create(
        {
          name: 'High Off Life',
          artist: future._id,
          date: 2020,
          image: 'fixtures/highOffLife.png',
        },
        {
          name: 'Future',
          artist: future._id,
          date: 2017,
          image: 'fixtures/futureAlbum.png',
        },
        {
          name: 'Rassvet',
          artist: levanGorozia._id,
          date: 2021,
          image: 'fixtures/rassvet.png',
        },
        {
          name: 'Alpha',
          artist: levanGorozia._id,
          date: 2022,
          image: 'fixtures/alpha.png',
        },
      );

    await this.trackModel.create(
      {
        name: 'Too Comfortable',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 1,
      },
      {
        name: 'Hard To Choose One',
        album: highOffLife._id,
        duration: '4:05',
        track_number: 2,
      },
      {
        name: 'Last Name',
        album: highOffLife._id,
        duration: '3:45',
        track_number: 3,
      },
      {
        name: 'Trapped In The Sun',
        album: highOffLife._id,
        duration: '3:15',
        track_number: 4,
      },
      {
        name: 'Life Is Good',
        album: highOffLife._id,
        duration: '4:25',
        track_number: 5,
      },
      {
        name: 'Rent Money',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 1,
      },
      {
        name: 'Mask Off',
        album: futureAlbum._id,
        duration: '4:05',
        track_number: 2,
      },
      {
        name: 'Zoom',
        album: futureAlbum._id,
        duration: '3:45',
        track_number: 3,
      },
      {
        name: 'Draco',
        album: futureAlbum._id,
        duration: '3:15',
        track_number: 4,
      },
      {
        name: 'Life Is Good',
        album: futureAlbum._id,
        duration: '4:25',
        track_number: 5,
      },
      {
        name: 'V Samamom Nachale',
        album: rassvet._id,
        duration: '4:25',
        track_number: 1,
      },
      {
        name: 'Outro',
        album: rassvet._id,
        duration: '4:05',
        track_number: 2,
      },
      {
        name: 'Park Gorkogo',
        album: rassvet._id,
        duration: '3:45',
        track_number: 3,
      },
      {
        name: 'Ne pokiday menya',
        album: rassvet._id,
        duration: '3:15',
        track_number: 4,
      },
      {
        name: 'Korabli',
        album: rassvet._id,
        duration: '4:25',
        track_number: 5,
      },
      {
        name: 'Alpha',
        album: alpha._id,
        duration: '4:25',
        track_number: 1,
      },
      {
        name: 'Plyazh',
        album: alpha._id,
        duration: '4:05',
        track_number: 2,
      },
      {
        name: 'Hoodie',
        album: alpha._id,
        duration: '3:45',
        track_number: 3,
      },
      {
        name: 'Bandity',
        album: alpha._id,
        duration: '3:15',
        track_number: 4,
      },
      {
        name: 'Korabli',
        album: alpha._id,
        duration: '4:25',
        track_number: 5,
      },
    );

    await this.userModel.create(
      {
        username: 'John',
        password: '123',
        role: 'admin',
        token: randomUUID(),
      },
      {
        username: 'Jane',
        password: '123',
        role: 'user',
        token: randomUUID(),
      },
    );
  }
}
