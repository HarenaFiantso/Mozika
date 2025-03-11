import { NotImplementedError } from '@/errors';
import { AlbumType, CrupdateAlbum, SongType } from '@/types';

export const crupdateAlbums = (_toCrupdate: CrupdateAlbum[]): AlbumType[] => {
  throw new NotImplementedError();
};

export const dropAlbums = (_toDrop: CrupdateAlbum[]): AlbumType[] => {
  throw new NotImplementedError();
};

export const getAlbums = (_filterCondition?: CrupdateAlbum): AlbumType[] => {
  throw new NotImplementedError();
};

export const getAlbumById = (_id: number): AlbumType => {
  throw new NotImplementedError();
};

export const albumsLinkToSongs = (_album: AlbumType, _songs: SongType[]): AlbumType[] => {
  throw new NotImplementedError();
};

export const albumsUnlinkToSongs = (_album: AlbumType, _songs: SongType[]): AlbumType[] => {
  throw new NotImplementedError();
};
