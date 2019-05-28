CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `myblog`.`users`(`username`,`password`,`realname`) VALUES ('zhangsan','123','张三');
INSERT INTO `myblog`.`blogs`(`title`,`content`,`createtime`,`author`) VALUES ('标题','内容A',1558757033578,'zhangsan');

ALTER TABLE `myblog-test`.`users`
CHANGE COLUMN `password` `password` VARCHAR(32) NOT NULL ;
-- 使用update语句时，报错you are using safe mode...,要执行SET SQL_SAFE_UPDATES=0;解决