-- Create database if not exists:
CREATE DATABASE IF NOT EXISTS eventura;
USE eventura; -- select database

-- Create tables only if they do not exist:

-- Create users table if not exists:
CREATE TABLE IF NOT EXISTS users (
    user_id             INT             AUTO_INCREMENT, -- primary key
    user_first_name     VARCHAR(50)     NOT NULL,
    user_last_name      VARCHAR(50)     NOT NULL,
    user_email          VARCHAR(320)    NOT NULL, -- unique
    user_password       VARCHAR(50)     NOT NULL,
    user_is_admin       BOOLEAN         NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id),
    UNIQUE (user_email)
);

-- Create cities table if not exists:
CREATE TABLE IF NOT EXISTS cities (
    city_id             INT             AUTO_INCREMENT, -- primary key
    city_name           VARCHAR(100)    NOT NULL,
    PRIMARY KEY (city_id)
);

-- Create postal_codes table if not exists:
CREATE TABLE IF NOT EXISTS postal_codes (
    postal_code_id      INT             AUTO_INCREMENT, -- primary key
    postal_code_number  INT             NOT NULL,
    PRIMARY KEY (postal_code_id),
    UNIQUE (postal_code_number)
);

-- Create locations table if not exists:
CREATE TABLE IF NOT EXISTS locations (
    location_id         INT             AUTO_INCREMENT, -- primary key
    location_name       VARCHAR(100),
    location_address    VARCHAR(255)    NOT NULL,
    postal_code_id      INT             NOT NULL, -- foreign key
    city_id             INT             NOT NULL, -- foreign key
    PRIMARY KEY (location_id),
    FOREIGN KEY (postal_code_id) REFERENCES postal_codes(postal_code_id),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

-- Create organizers table if not exists:
CREATE TABLE IF NOT EXISTS organizers (
    organizer_id        INT             AUTO_INCREMENT, -- primary key
    organizer_name      VARCHAR(100)     NOT NULL,
    PRIMARY KEY (organizer_id),
    UNIQUE (organizer_name)
);

-- Create events table if not exists:
CREATE TABLE IF NOT EXISTS events (
    event_id            INT             AUTO_INCREMENT, -- primary key
    event_name          VARCHAR(100)    NOT NULL,
    event_start_date    DATETIME        NOT NULL,
    event_end_date      DATETIME        NOT NULL,
    event_seats         INT             NOT NULL,
    event_description   LONGTEXT        NOT NULL,
    event_thumbnail     VARCHAR(2048)   NOT NULL,
    location_id         INT             NOT NULL, -- foreign key
    PRIMARY KEY (event_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    CHECK (event_start_date < event_end_date)
);

-- Create organize intermediate table if not exists:
CREATE TABLE IF NOT EXISTS organize (
    event_id            INT             NOT NULL, -- foreign key
    organizer_id        INT             NOT NULL, -- foreign key
    PRIMARY KEY (event_id, organizer_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE
);

-- Create register intermediate table if not exists:
CREATE TABLE IF NOT EXISTS register (
    user_id             INT             NOT NULL, -- foreign key
    event_id            INT             NOT NULL, -- foreign key
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- Créer un utilisateur avec le bon plugin d'authentification
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';

-- Donner les permissions nécessaires à l'utilisateur
GRANT ALL PRIVILEGES ON votre_base_de_donnees.* TO 'user'@'%';

-- Appliquer les modifications
FLUSH PRIVILEGES;