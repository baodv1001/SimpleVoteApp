CREATE DATABASE VoteAppDB;
GO
USE VoteAppDB;
GO
CREATE TABLE Users (
	idUser int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	email varchar(255) NOT NULL,
	password text NOT NULL

);
GO
CREATE TABLE Items (
	idItem int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	title varchar(255) NOT NULL,
	description varchar(255),
	votes int DEFAULT 0,
);
GO
CREATE TABLE Voting (
	idVoting int NOT NULL IDENTITY(1,1) PRIMARY KEY, 
	idUser int NOT NULL FOREIGN KEY REFERENCES Users(idUser),
	idItem int NOT NULL FOREIGN KEY REFERENCES Items(idItem),
	voteDate DateTime NOT NULL 
);
GO
CREATE TRIGGER trg_Voting ON Voting AFTER INSERT AS
BEGIN
	UPDATE Items
	SET votes+=1
	FROM Items JOIN inserted ON Items.idItem= inserted.idItem
END
GO
INSERT INTO Items(title,description) Values('Python','Awesome Python');
INSERT INTO Items(title,description) Values('C#','Awesome C#');
INSERT INTO Items(title,description) Values('C++','Awesome C++');
INSERT INTO Items(title,description) Values('Java','Awesome Java');
INSERT INTO Items(title,description) Values('Perl','Awesome Perl');
INSERT INTO Items(title,description) Values('Javascript','Awesome Javascript');
INSERT INTO Items(title,description) Values('PHP','Awesome PHP');
INSERT INTO Items(title,description) Values('Kotlin','Awesome Kotlin');
INSERT INTO Items(title,description) Values('Html','Awesome Html');
INSERT INTO Items(title,description) Values('CSS','Awesome CSS');
INSERT INTO Items(title,description) Values('Dart','Awesome Dart');
INSERT INTO Items(title,description) Values('TypeScript','Awesome Type Script');
INSERT INTO Items(title,description) Values('C','Awesome C');
INSERT INTO Items(title,description) Values('Shell','Awesome Shell');
