import { FC, PropsWithChildren } from 'react';

import { Text, View } from 'react-native';

import '@/global.css';
import { db } from '@/services/db/connection';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import migrations from '../../../drizzle/migrations';

const MigrationLayout: FC<PropsWithChildren> = ({ children }) => {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold underline">Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold underline">Migration is in progress...</Text>
      </View>
    );
  }

  return children;
};

export default MigrationLayout;
