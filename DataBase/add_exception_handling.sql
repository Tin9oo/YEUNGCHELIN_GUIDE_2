ALTER TABLE restaurant
ADD CHECK (telnum REGEXP '^[0-9]{10,11}$'),
MODIFY coarse_location ENUM('동', '서', '남', '북') NOT NULL,
MODIFY coarse_location ENUM('동', '서', '남', '북') NOT NULL,
MODIFY star_score DECIMAL(2, 1) CHECK (star_score BETWEEN 0 AND 5);

ALTER TABLE user_login
MODIFY user_id VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(user_id) >= 6);

ALTER TABLE menu
MODIFY price DECIMAL(10, 2) NOT NULL CHECK (price >= 0);
