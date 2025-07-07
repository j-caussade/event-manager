-- Create database:
CREATE DATABASE event_manager;
USE event_manager; -- select database

-- Create users table:
CREATE TABLE users (
    user_id             INT             AUTO_INCREMENT, -- primary key
    user_first_name     VARCHAR(50)     NOT NULL,
    user_last_name      VARCHAR(50)     NOT NULL,
    user_email          VARCHAR(320)    NOT NULL, -- unique
    user_password       VARCHAR(50)     NOT NULL,
    user_is_admin       BOOLEAN         NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id),
    UNIQUE (user_email)
);

-- Create events table:
CREATE TABLE events (
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

-- Create events_organizers intermediate table:
CREATE TABLE events_organizers (
    event_id            INT             NOT NULL, -- foreign key
    organizer_id        INT             NOT NULL, -- foreign key
    PRIMARY KEY (event_id, organizer_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE,
);

-- Create organizers table:
CREATE TABLE organizers (
    organizer_id        INT             AUTO_INCREMENT, -- primary key
    organizer_name      VARCHAR(100)     NOT NULL,
    PRIMARY KEY (organizer_id),
    UNIQUE (organizer_name)
);

-- Create locations table:
CREATE TABLE locations (
    location_id         INT             AUTO_INCREMENT, -- primary key
    location_name       VARCHAR(100)    ,
    location_address    VARCHAR (255)   NOT NULL,
    postal_code_id      INT             NOT NULL, -- foreign key
    city_id             INT             NOT NULL, -- foreign key
    PRIMARY KEY (location_id),
    FOREIGN KEY (postal_code_id) REFERENCES postal_codes(postal_code_id),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

-- Create postal_codes table:
CREATE TABLE postal_codes (
    postal_code_id      INT             AUTO_INCREMENT, -- primary key
    postal_code_number  INT             NOT NULL,
    PRIMARY KEY (postal_code_id),
    UNIQUE (postal_code_number)
);

-- Create cities table:
 CREATE TABLE cities (
    city_id             INT             AUTO_INCREMENT, -- primary key
    city_name           VARCHAR(100)    NOT NULL,
    PRIMARY KEY (city_id)
 );