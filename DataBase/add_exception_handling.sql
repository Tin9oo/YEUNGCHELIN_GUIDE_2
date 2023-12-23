ALTER TABLE restaurant
MODIFY telnum VARCHAR(13) NOT NULL CHECK (telnum REGEXP '^(010-?[0-9]{4}-?[0-9]{4})$'),
MODIFY coarse_location ENUM('동', '서', '남', '북') NOT NULL;

ALTER TABLE rating_list
MODIFY star_score DECIMAL(2, 1) CHECK (star_score BETWEEN 0 AND 5);

ALTER TABLE user_login
MODIFY user_id VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(user_id) >= 3);

ALTER TABLE menu
MODIFY price DECIMAL(10, 2) NOT NULL CHECK (price >= 0);
