create table todos(
    id VARCHAR(255) primary key,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progess INT,
    date VARCHAR(300)
);

create table users(
    email VARCHAR(255) primary key,
    hashed_password VARCHAR(255)
);