import React from 'react';

import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
  handleSubmit: () => void;
  title: string;
  additionalStyles?: string;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  handleSubmit,
  title,
  additionalStyles,
}) => (
  <TouchableOpacity
    className={`w-[90%] rounded-[4rem] py-5 ${additionalStyles}`}
    onPress={handleSubmit}
  >
    <Text className="text-center text-xl font-bold text-white">{title}</Text>
  </TouchableOpacity>
);
