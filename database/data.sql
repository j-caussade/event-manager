/*
================================================================================
 Eventura Database - Initial Test Data
================================================================================

 This SQL file contains test data for the Eventura application.
 It is intended for LOCAL DEVELOPMENT and TESTING purposes only.

 Tables populated:
   - cities;
   - postal_codes;
   - locations;
   - organizers;
   - events;
   - organize;
   - register;
================================================================================
*/

-- Select the database
USE eventura;

-- =============================================
-- Users
-- =============================================
INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_is_admin) VALUES
('John', 'Doe', 'john.doe@example.com', '$2b$10$31Zh42Fr4IaopTKzV4dOpOh9v3RpUB0OMlORtqhNlahFQm5BkPc0e', TRUE),
('Jane', 'Smith', 'jane.smith@example.com', '$2b$10$9/rns8ziiqdLxj/MS3uSnuBSGGQ4nLzESUFtq38lPN64C2EHP2ZdW', FALSE);

-- =============================================
-- Cities
-- =============================================
INSERT INTO cities (city_name) VALUES
('Paris'),
('Lyon'),
('Marseille');

-- =============================================
-- Postal codes
-- =============================================
INSERT INTO postal_codes (postal_code_number) VALUES
(75000),
(69000),
(13000);

-- =============================================
-- Locations
-- =============================================
INSERT INTO locations (location_name, location_address, postal_code_id, city_id) VALUES
('Eiffel Tower', 'Champ de Mars, 5 Avenue Anatole France', 1, 1),
('Lyon Convention Center', '50 Quai Charles de Gaulle', 2, 2),
('Vieux-Port', '1 Quai du Port', 3, 3);

-- =============================================
-- Organizers
-- =============================================
INSERT INTO organizers (organizer_name) VALUES
('Event Masters'),
('Conference Pros');

-- =============================================
-- Events
-- =============================================
INSERT INTO events (
    event_name,
    event_start_date,
    event_end_date,
    event_seats,
    event_description,
    event_thumbnail,
    location_id
) VALUES
(
    'Tech Conference 2025',
    '2025-11-15 09:00:00',
    '2025-11-17 18:00:00',
    500,
    'Annual conference exploring the latest advancements in technology, AI, and software development.',
    'https://example.com/images/tech-conference-thumbnail.jpg',
    1
),
(
    'International Food Festival',
    '2025-12-01 10:00:00',
    '2025-12-03 20:00:00',
    1000,
    'A celebration of world cuisines with cooking demonstrations, tastings, and cultural events.',
    'https://example.com/images/food-festival-thumbnail.jpg',
    2
);

-- =============================================
-- Organizers
-- =============================================
INSERT INTO organize (event_id, organizer_id) VALUES
(1, 1),
(2, 2);

-- =============================================
-- Register
-- =============================================
INSERT INTO register (user_id, event_id) VALUES
(1, 1),
(2, 2);
