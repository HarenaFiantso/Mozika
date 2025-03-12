import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const albumTable = sqliteTable('albumTable', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const songTable = sqliteTable('songTable', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  localPath: text().notNull(),
  albumId: integer().references(() => albumTable.id),
});
