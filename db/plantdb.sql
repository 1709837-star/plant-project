-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        12.3.3-MariaDB - MariaDB Server
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.20.0.7320
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 plantdb.my_plant 구조 내보내기
CREATE TABLE IF NOT EXISTS `my_plant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `adopted_date` date DEFAULT NULL,
  `last_watered_date` date NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `nickname` varchar(100) NOT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `watering_interval_days` int(11) DEFAULT NULL,
  `species_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `moddate` datetime(6) DEFAULT NULL,
  `regdate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcgg55721tx7qt00fprew3ctu` (`species_id`),
  KEY `FKarts31sce04fsje167wyy6u88` (`user_id`),
  CONSTRAINT `FKarts31sce04fsje167wyy6u88` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKcgg55721tx7qt00fprew3ctu` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 plantdb.species 구조 내보내기
CREATE TABLE IF NOT EXISTS `species` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `moddate` datetime(6) DEFAULT NULL,
  `regdate` datetime(6) DEFAULT NULL,
  `difficulty` varchar(20) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `light_level` varchar(20) DEFAULT NULL,
  `min_winter_temp` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `scientific_name` varchar(200) DEFAULT NULL,
  `source_url` varchar(500) DEFAULT NULL,
  `water_note` varchar(1000) DEFAULT NULL,
  `water_autumn_days` int(11) DEFAULT NULL,
  `water_spring_days` int(11) DEFAULT NULL,
  `water_summer_days` int(11) DEFAULT NULL,
  `water_winter_days` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK29ixq8ot8e88rk6v7jpkisgr3` (`name`),
  KEY `idx_species_name` (`name`),
  KEY `idx_species_light` (`light_level`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 plantdb.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `moddate` datetime(6) DEFAULT NULL,
  `regdate` datetime(6) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 plantdb.watering_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `watering_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `memo` varchar(500) DEFAULT NULL,
  `watered_date` date NOT NULL,
  `my_plant_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6n9iog287u63xcnb628ojd5ib` (`my_plant_id`),
  CONSTRAINT `FK6n9iog287u63xcnb628ojd5ib` FOREIGN KEY (`my_plant_id`) REFERENCES `my_plant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
