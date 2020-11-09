DROP TABLE `comment`;
DROP TABLE `ticket`;
CREATE TABLE ticket (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    author VARCHAR(255),
    time VARCHAR(255),
    status BIT(1),
    topic VARCHAR(255),
    urgency INTEGER
);
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `ticket_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`)
);