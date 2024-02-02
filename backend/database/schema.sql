DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS note;
-- example
create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null
);
-- example

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  hashed_password VARCHAR(500) NOT NULL
);

CREATE TABLE note (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  user_id INT,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);