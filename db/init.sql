use pirosquare;

CREATE TABLE `User` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `ID` VARCHAR(255) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `year` INT DEFAULT NULL COMMENT '기수',
    `nickname` VARCHAR(50) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL,
    `introduce` VARCHAR(255) DEFAULT NULL,
		`is_active` BOOLEAN NULL DEFAULT FALSE,
		`is_admin` BOOLEAN NULL DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Post` (
    `post_id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `likes_count` INT NOT NULL DEFAULT 0,
    `comments_count` INT NOT NULL DEFAULT 0,
    `activate` BOOLEAN NULL DEFAULT TRUE,
    `category` INT NULL COMMENT '모집/공고게시판 사용',
		`member` INT NULL COMMENT '모집/공고게시판 사용',
		`post_image` VARCHAR(255) NULL,
    `board_type_id` INT NOT NULL,
		`start_date` date NULL,
		`end_date` date NULL,
    `user_id` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL
);

CREATE TABLE `Comment` (
    `comment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `content` TEXT NOT NULL,
    `likes_count` INT NOT NULL DEFAULT 0,
    `user_id` INT NULL,
    `post_id` INT NOT NULL,
    `parent_comment_id` INT NULL COMMENT '-1 : 삭제된 댓글',
		`comment_image` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL,
    FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE CASCADE
);

CREATE TABLE `PostLike` (
    `post_like_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE CASCADE
);

CREATE TABLE `CommentLike` (
    `comment_like_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `comment_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`comment_id`) REFERENCES `Comment`(`comment_id`) ON DELETE CASCADE
);

-- 테스트 데이터
INSERT INTO `User` (ID, name, year) VALUES ('testid1', '곽민경', '19');
INSERT INTO `User` (ID, name, year) VALUES ('testid2', '김현수', '19');
INSERT INTO `User` (ID, name, year) VALUES ('testid3', '왕한솔', '19');
INSERT INTO `User` (ID, name, year) VALUES ('testid4', '안정근', '19');

INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id) VALUES ('test title1', 'content1', 0, 0, 1, 1, 1);
INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id) VALUES ('test title1', 'content1', 0, 0, 1, 2, 3);
INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id) VALUES ('test title1', 'content1', 0, 0, 1, 3, 4);
INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id) VALUES ('test title1', 'content1', 0, 0, 1, 2, 2);
INSERT INTO `Post` (title, content, likes_count, comments_count, activate, board_type_id, user_id, member, start_date, end_date) VALUES ('test title1', 'content1', 0, 0, 1, 4, 2, 5, "2023-10-05", "2023-10-10");

INSERT INTO `Comment` (content, likes_count, user_id, post_id) VALUES ('test content1', 0, 3, 1);
INSERT INTO `Comment` (content, likes_count, user_id, post_id) VALUES ('test content2', 0, 4, 2);