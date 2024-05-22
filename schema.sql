DROP TABLE IF EXISTS users_scoreboard;
CREATE TABLE users_scoreboard 
(
    user_id TEXT NOT NULL,
    number_goblins_killed INTEGER NOT NULL,
    level INTEGER NOT NULL

);

DROP TABLE IF EXISTS users; 

CREATE TABLE users 
(  
    user_id TEXT PRIMARY KEY, 
    password TEXT NOT NULL 
);  

