import { NotImplementedError } from '@/utils/errors';
import SoundPlayer from 'react-native-sound-player';

class SongType {
  id: number;
  name: string;
  localPath: string;

  constructor(id: number, name: string, localPath: string) {
    this.id = id;
    this.name = name;
    this.localPath = localPath;
  }

  play(): void {
    try {
      SoundPlayer.playAsset(require(this.localPath));
    } catch (e) {
      console.error(`Cannot play the sound file`, e);
    }
  }

  pause(): void {
    SoundPlayer.pause();
  }

  path_exist(): boolean {
    throw new NotImplementedError();
  }

  get_album(): AlbumType {
    throw new NotImplementedError();
  }
}

export type AlbumType = {
  id: number;
  name: string;
  songs: SongType[];
};

export type CrupdateSong = {
  id?: number;
  name?: string;
  localPath?: string;
};

export type CrupdateAlbum = {
  id?: number;
  name?: string;
};
