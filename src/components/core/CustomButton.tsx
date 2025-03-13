import { FC } from 'react';

import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
  handleSubmit: () => void;
  title: string;
  additionalStyles?: string;
};

export const CustomButton: FC<CustomButtonProps> = ({ handleSubmit, title, additionalStyles }) => (
  <TouchableOpacity className={`w-[90%] ${additionalStyles}`} onPress={handleSubmit}>
    <Text className="text-center text-xl font-bold text-white">{title}</Text>
  </TouchableOpacity>
);
