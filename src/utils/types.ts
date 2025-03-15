import { Track } from 'react-native-track-player';

export type TrackWithPlaylist = Track & { playlist?: string[] };
