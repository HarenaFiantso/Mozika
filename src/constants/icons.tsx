import { MaterialIcons } from '@expo/vector-icons';

type IconProps = {
  color: string;

  [key: string]: any;
};

export const icons = {
  index: (props: IconProps) => <MaterialIcons name="my-library-music" size={20} {...props} />,
  playlist: (props: IconProps) => <MaterialIcons name="playlist-play" size={20} {...props} />,
} as const;
