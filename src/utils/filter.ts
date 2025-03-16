import { Artist } from '@/utils/types';

export const trackTitleFilter = (title: string) => (track: any) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export const artistNameFilter = (name: string) => (artist: Artist) =>
  artist.name.toLowerCase().includes(name.toLowerCase());
