import { useMemo } from 'react';

import { unknownTrackImageUri } from '@/constants/images';
import { Artist, Playlist, TrackWithPlaylist } from '@/utils/types';
import * as MusicLibrary from 'expo-music-library';
import { Asset } from 'expo-music-library';
import { Track } from 'react-native-track-player';
import { create } from 'zustand';

type LibraryState = {
  tracks: TrackWithPlaylist[];
  playlists: Playlist[];
  fetchTracks: () => Promise<void>;
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
  createPlaylist: (playlistName: string) => void;
};


export const useLibraryStore = create<LibraryState>()(set => ({
  tracks: [],
  playlists: [],
  fetchTracks: async () => {
    try {
      const { granted } = await MusicLibrary.requestPermissionsAsync();
      if (!granted) return;

      const { assets } = await MusicLibrary.getAssetsAsync({ first: 100 });

      /*let hasNextPage;
      let assets: Asset[] = [];
      let endCursor;

      do {
        const page = await MusicLibrary.getAssetsAsync({ first: 20, after: endCursor });
        hasNextPage = page.hasNextPage;
        endCursor = page.endCursor;
        assets = assets.concat(page.assets);
      } while (hasNextPage);*/

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

      set(state => {
        if (JSON.stringify(state.tracks) !== JSON.stringify(formattedTracks)) {
          return { tracks: formattedTracks };
        }
        return state;
      });
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
  createPlaylist: (playlistName) => {
    set(state => {
      const newPlaylist: Playlist = {
        name: playlistName,
        tracks: [],
        artworkPreview: unknownTrackImageUri,
      };
      return {
        playlists: [...state.playlists, newPlaylist],
      };
    });
  },
}));

export const useTracks = () => useLibraryStore(state => state.tracks);
export const useArtists = () => {
  const tracks = useLibraryStore(state => state.tracks);

  return useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find(artist => artist.name === track.artist);

      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist ?? 'Unknown',
          tracks: [track],
        });
      }

      return acc;
    }, [] as Artist[]);
  }, [tracks]);
};

export const usePlaylists = () => {
  const playlists = useLibraryStore(state => state.playlists);
  const addToPlaylist = useLibraryStore(state => state.addToPlaylist);
  const createPlaylist = useLibraryStore(state => state.createPlaylist);

  return { playlists, addToPlaylist, createPlaylist };
};
