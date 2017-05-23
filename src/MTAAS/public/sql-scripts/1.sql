CREATE TABLE articles (
  id int(11) NOT NULL AUTO_INCREMENT,
  article_name varchar(100) DEFAULT NULL,
  title varchar(100) DEFAULT NULL,
  body varchar(1000) DEFAULT NULL,
  description varchar(100) DEFAULT NULL,
  link varchar(100) DEFAULT NULL,
  PRIMARY KEY (id));
