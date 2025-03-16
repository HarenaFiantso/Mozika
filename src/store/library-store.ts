import { TrackWithPlaylist } from '@/utils/types';
import * as MusicLibrary from 'expo-music-library';
import { Track } from 'react-native-track-player';
import { create } from 'zustand';

type FilterConditions = {
  title?: string;
  artist?: string;
  album?: string;
  durationMin?: number;
  durationMax?: number;
};

type LibraryState = {
  tracks: TrackWithPlaylist[];
  filterConditions: FilterConditions;
  cachedTracks: TrackWithPlaylist[];
  setFilterConditions: (filterConditions: FilterConditions) => void;
  fetchTracks: () => Promise<void>;
  fetchCachedTracks: () => Promise<void>;
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
};

export const useLibraryStore = create<LibraryState>()(set => ({
  cachedTracks: [],
  tracks: [],
  filterConditions: {},
  setFilterConditions: (filterConditions: FilterConditions) => {
    set({ filterConditions: filterConditions });
  },
  fetchTracks: async () => {
    set(state => ({
      tracks: state.cachedTracks.filter(assets => {
        if (
          !state.filterConditions.artist &&
          !state.filterConditions.album &&
          !state.filterConditions.title &&
          !state.filterConditions.durationMin &&
          !state.filterConditions.durationMax
        )
          return true;
        return (
          (assets.artist
            ?.toLowerCase()
            .search((state.filterConditions.artist ?? '½').toLowerCase()) ?? -1) > 0 ||
          (assets.album
            ?.toLowerCase()
            .search((state.filterConditions.album ?? '½').toLowerCase()) ?? -1) > 0 ||
          (assets.title
            ?.toLowerCase()
            .search((state.filterConditions.title ?? '½').toLowerCase()) ?? -1) > 0 /* ||
            (state.filterConditions.durationMin ?? 0) <= (assets.duration ?? 0) ||
            (assets.duration ?? 0) <= (state.filterConditions.durationMax ?? Infinity)*/
        );
      }),
    }));
  },
  fetchCachedTracks: async () => {
    try {
      const { granted } = await MusicLibrary.requestPermissionsAsync();
      if (!granted) return;

      const { assets } = await MusicLibrary.getAssetsAsync({ first: 100 });

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

      set({ cachedTracks: formattedTracks });
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

export const useFilterTracks = () => useLibraryStore(state => state.filterConditions);
