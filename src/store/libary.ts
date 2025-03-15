import { TrackWithPlaylist } from '@/utils/types';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import { Track } from 'react-native-track-player';
import { create } from 'zustand';

type LibraryState = {
  tracks: TrackWithPlaylist[];
  fetchTracks: () => Promise<void>;
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
};

export const useLibraryStore = create<LibraryState>()(set => ({
  tracks: [],
  fetchTracks: async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') return;

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
    });

    const formattedTracks: TrackWithPlaylist[] = media.assets.map((asset: Asset) => ({
      id: asset.id,
      title: asset.filename,
      url: asset.uri,
      artist: 'Unknown Artist',
      rating: 0,
      playlist: [],
    }));

    set({ tracks: formattedTracks });
  },
  toggleTrackFavorite: track =>
    set(state => ({
      tracks: state.tracks.map(currentTrack => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            rating: currentTrack.rating === 1 ? 0 : 1,
          };
        }

        return currentTrack;
      }),
    })),
  addToPlaylist: (track, playlistName) =>
    set(state => ({
      tracks: state.tracks.map(currentTrack => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            playlist: [...(currentTrack.playlist ?? []), playlistName],
          };
        }

        return currentTrack;
      }),
    })),
}));

export const useTracks = () => useLibraryStore(state => state.tracks);
