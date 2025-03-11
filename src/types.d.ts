export type SongType = {
  id: number;
  name: string;
  localPath: string;
};

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
