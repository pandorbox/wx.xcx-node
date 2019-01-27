#snid--商品导航图片ID tid--商品类别ID imgid--商品图片可点击ID
SET NAMES UTF8;
DROP DATABASE IF EXISTS dq;
CREATE DATABASE dq CHARSET=UTF8;
USE dq;

CREATE TABLE dq_user(
    uname VARCHAR(22),
    upwd VARCHAR(22)
);
INSERT INTO dq_user VALUES
('qjk','123456');

#导航九宫格
CREATE TABLE dq_navimg(
    img_url VARCHAR(225),
    name VARCHAR(10)
);
INSERT INTO dq_navimg VALUES
("http://127.0.0.1:3000/img/nav/nav1.jpg","电视"),
("http://127.0.0.1:3000/img/nav/nav2.jpg","冰箱"),
("http://127.0.0.1:3000/img/nav/nav3.jpg","洗衣机"),
("http://127.0.0.1:3000/img/nav/nav4.jpg","空调"),
("http://127.0.0.1:3000/img/nav/nav5.jpg","茶几"),
("http://127.0.0.1:3000/img/nav/nav6.jpg","油烟机"),
("http://127.0.0.1:3000/img/nav/nav7.jpg","微波炉"),
("http://127.0.0.1:3000/img/nav/nav8.jpg","电视" ),
("http://127.0.0.1:3000/img/nav/nav9.jpg","冰箱");


CREATE TABLE dq_shopclass(
    name VARCHAR (10),
    classn VARCHAR(10)
);



#商品类列表 
CREATE TABLE dq_shopclassimg(
	name VARCHAR(10),
	classn VARCHAR(10),
	imgid INT(4) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	img_url VARCHAR(225),
	imgm1_url VARCHAR(225),
	imgm2_url VARCHAR(225),
	imgm3_url VARCHAR(225),
	imgs1_url VARCHAR(225),
	imgs2_url VARCHAR(225),
	imgs3_url VARCHAR(225),
	size VARCHAR(225),
	title VARCHAR(225),
	price INT(4),
	other VARCHAR(20)
);

