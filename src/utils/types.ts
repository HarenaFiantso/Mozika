import { Track } from 'react-native-track-player';

export type Artist = {
  name: string;
  tracks: Track[];
};

export type Playlist = {
  name: string;
  tracks: Track[];
  artworkPreview: string;
};

export type TrackWithPlaylist = Track & { playlist?: string[] };
