import { NotImplementedError } from '@/errors';
import { CrupdateSong, SongType } from '@/types';

export const crupdateSongs = (_toCrupdate: CrupdateSong[]): SongType[] => {
  throw new NotImplementedError();
};

export const dropSongs = (_toDrop: CrupdateSong[]): SongType[] => {
  throw new NotImplementedError();
};

export const getSongs = (_filterCondition?: CrupdateSong): SongType[] => {
  throw new NotImplementedError();
};

export const getSongById = (_id: number): SongType => {
  throw new NotImplementedError();
};
