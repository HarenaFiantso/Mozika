import { Track } from 'react-native-track-player';

export type Artist = {
  name: string;
  tracks: Track[];
};

export type TrackWithPlaylist = Track & { playlist?: string[] };
