import { TrackWithPlaylist } from '@/utils/types';
import * as MusicLibrary from 'expo-music-library';
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
    try {
      const { granted } = await MusicLibrary.requestPermissionsAsync();
      if (!granted) return;

      const { assets } = await MusicLibrary.getAssetsAsync();

      const formattedTracks: TrackWithPlaylist[] = assets.map(asset => ({
        id: asset.id,
        url: asset.uri,
        title: asset.title,
        artist: asset.artist ?? 'Unknown Artist',
        album: asset.albumId ?? 'Unknown Album',
        duration: asset.duration ?? 0,
        artwork: asset.artwork,
        playlist: [],
      }));

      set({ tracks: formattedTracks });
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
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
