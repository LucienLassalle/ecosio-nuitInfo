DROP DATABASE IF EXISTS ecosio;
CREATE DATABASE ecosio;
USE ecosio;

CREATE TABLE player (
    userId                	SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userEmail            	VARCHAR(320) NOT NULL,
    userPseudo            	VARCHAR(20) NOT NULL,
    userPassword        	VARCHAR(255) NOT NULL,
    CONSTRAINT PK_player PRIMARY KEY (userId),
    CONSTRAINT UK_userEmail UNIQUE KEY (userEmail),
    CONSTRAINT UK_userPseudo UNIQUE KEY (userPseudo)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE scoreboard (
    userId                	SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userScore            	SMALLINT DEFAULT 0,
    CONSTRAINT PK_scoreboard PRIMARY KEY (userId, userScore),
    CONSTRAINT FK_player FOREIGN KEY (userId) REFERENCES player (userId)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE question (
	questionId				TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	questionLabel			VARCHAR(300) NOT NULL,
	questionExplication		VARCHAR(300) NOT NULL,
	CONSTRAINT PK_question PRIMARY KEY (questionId)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE answer (
	answerId				TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	answerLabel				VARCHAR(300) NOT NULL,
	answerBinary			BOOLEAN NOT NULL,
	questionId				TINYINT UNSIGNED NOT NULL,
	CONSTRAINT PK_answer PRIMARY KEY (answerId),
	CONSTRAINT FK_question FOREIGN KEY (questionId) REFERENCES question (questionId)
)   ENGINE=InnoDB DEFAULT CHARSET=latin1;