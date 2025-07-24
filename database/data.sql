-- Utiliser la base de données
USE event_manager;

-- Insérer des données dans la table users
INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_is_admin) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', TRUE),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', FALSE);

-- Insérer des données dans la table cities
INSERT INTO cities (city_name) VALUES
('Paris'),
('Lyon'),
('Marseille');

-- Insérer des données dans la table postal_codes
INSERT INTO postal_codes (postal_code_number) VALUES
(75001),
(69001),
(13001);

-- Insérer des données dans la table locations
INSERT INTO locations (location_name, location_address, postal_code_id, city_id) VALUES
('Eiffel Tower', 'Champ de Mars, 5 Avenue Anatole', 1, 1),
('Lyon Convention Center', '50 Quai Charles de Gaulle', 2, 2),
('Vieux-Port', '1 Quai du Port', 3, 3);

-- Insérer des données dans la table organizers
INSERT INTO organizers (organizer_name) VALUES
('Event Masters'),
('Conference Pros');

-- Insérer des données dans la table events
INSERT INTO events (event_name, event_start_date, event_end_date, event_seats, event_description, event_thumbnail, location_id) VALUES
('Tech Conference', '2023-11-15 09:00:00', '2023-11-17 18:00:00', 500, 'A conference about the latest in tech.', 'http://example.com/tech.jpg', 1),
('Food Festival', '2023-12-01 10:00:00', '2023-12-03 20:00:00', 1000, 'A festival celebrating food from around the world.', 'http://example.com/food.jpg', 2);

-- Insérer des données dans la table organize
INSERT INTO organize (event_id, organizer_id) VALUES
(1, 1),
(2, 2);

-- Insérer des données dans la table register
INSERT INTO register (user_id, event_id) VALUES
(1, 1),
(2, 2);
