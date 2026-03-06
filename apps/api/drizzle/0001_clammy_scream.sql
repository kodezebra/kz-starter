PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_pages` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`is_published` integer DEFAULT false NOT NULL,
	`updated_at` integer DEFAULT '"2026-03-02T15:49:00.089Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_pages`("id", "slug", "title", "is_published", "updated_at") SELECT "id", "slug", "title", "is_published", "updated_at" FROM `pages`;--> statement-breakpoint
DROP TABLE `pages`;--> statement-breakpoint
ALTER TABLE `__new_pages` RENAME TO `pages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);