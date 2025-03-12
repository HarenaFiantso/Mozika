CREATE TABLE `albumTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `songTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`localPath` text NOT NULL,
	`albumId` integer,
	FOREIGN KEY (`albumId`) REFERENCES `albumTable`(`id`) ON UPDATE no action ON DELETE no action
);
