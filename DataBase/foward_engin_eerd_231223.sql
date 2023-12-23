-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema yeungchelin_guide_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema yeungchelin_guide_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yeungchelin_guide_db` DEFAULT CHARACTER SET utf8mb3 ;
USE `yeungchelin_guide_db` ;

-- -----------------------------------------------------
-- Table `yeungchelin_guide_db`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yeungchelin_guide_db`.`restaurant` (
  `idrestaurant` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `category1` VARCHAR(45) NULL DEFAULT NULL COMMENT '한중일양패카아',
  `category2` VARCHAR(45) NULL DEFAULT NULL COMMENT '한 - 족발/보쌈/찜/찜닭/탕/찌개/회/비빔밥/고기구이/백반/죽/국수/도시락/분식\\\\\\\\n중 - 짜장집/마라탕집/양꼬치집/우육면/탕후루/\\\\\\\\n일 - 라멘/스시/돈까스/덮밥\\\\\\\\n양 - 파스타/스테이크/샐러드/리조또/\\\\\\\\n패\\\\\\\\n카\\\\\\\\n아',
  `telnum` VARCHAR(20) NULL DEFAULT NULL,
  `coarse_location` VARCHAR(45) NULL DEFAULT NULL COMMENT '서문정문동문후문',
  `real_location` VARCHAR(45) NULL DEFAULT NULL COMMENT '실제주소',
  `operation_hour` VARCHAR(20) NULL DEFAULT NULL COMMENT '브레이킹타임 넣을것',
  `breakingtime` VARCHAR(20) NULL DEFAULT NULL,
  `update_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idrestaurant`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `yeungchelin_guide_db`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yeungchelin_guide_db`.`menu` (
  `restaurant_idrestaurant` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NULL DEFAULT NULL,
  `likes` INT NULL,
  PRIMARY KEY (`name`, `restaurant_idrestaurant`),
  INDEX `fk_menu_restaurant1_idx` (`restaurant_idrestaurant` ASC) VISIBLE,
  CONSTRAINT `fk_menu_restaurant1`
    FOREIGN KEY (`restaurant_idrestaurant`)
    REFERENCES `yeungchelin_guide_db`.`restaurant` (`idrestaurant`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `yeungchelin_guide_db`.`user_login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yeungchelin_guide_db`.`user_login` (
  `user_id` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `yeungchelin_guide_db`.`rating_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yeungchelin_guide_db`.`rating_list` (
  `restaurant_idrestaurant` INT NOT NULL,
  `user_login_user_id` VARCHAR(45) NOT NULL,
  `comment` VARCHAR(2000) NOT NULL,
  `star_score` INT NULL,
  PRIMARY KEY (`restaurant_idrestaurant`, `user_login_user_id`),
  INDEX `fk_rating_list_restaurant1_idx` (`restaurant_idrestaurant` ASC) VISIBLE,
  INDEX `fk_rating_list_user_login1_idx` (`user_login_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_rating_list_restaurant1`
    FOREIGN KEY (`restaurant_idrestaurant`)
    REFERENCES `yeungchelin_guide_db`.`restaurant` (`idrestaurant`),
  CONSTRAINT `fk_rating_list_user_login1`
    FOREIGN KEY (`user_login_user_id`)
    REFERENCES `yeungchelin_guide_db`.`user_login` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
