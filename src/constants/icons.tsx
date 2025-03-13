import { AntDesign, Entypo } from '@expo/vector-icons';

type IconProps = {
  color: string;

  [key: string]: any;
};

export const icons = {
  index: (props: IconProps) => <AntDesign name="home" size={26} {...props} />,
  explore: (props: IconProps) => <Entypo name="magnifying-glass" size={26} {...props} />,
  library: (props: IconProps) => <AntDesign name="folder1" size={26} {...props} />,
} as const;
