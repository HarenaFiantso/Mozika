import { FC } from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export const BackButton: FC<TouchableOpacityProps> = ({ children, ...rest }) => (
  <TouchableOpacity className="self-start" {...rest}>
    <MaterialIcons name="arrow-back" color="white" size={35} />
    {children}
  </TouchableOpacity>
);
