// Import the mysql2/promise module for database interactions using promises
const mysql = require("mysql2/promise");

// Import the eventService module which contains the business logic for event operations
const eventService = require("./eventService");

// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Set up the test environment before running any tests.
 *
 * This function configures the test database connection and inserts a test event
 * into the database to be used in the tests.
 */
beforeAll(async () => {
  // Configure environment variables for the test database connection
  process.env.DB_HOST = "your_test_db_host"; // Hostname of the test database
  process.env.DB_USER = "your_test_db_user"; // Username for the test database
  process.env.DB_PASSWORD = "your_test_db_password"; // Password for the test database
  process.env.DB_NAME = "your_test_db_name"; // Name of the test database

  // Define a test event to be inserted into the database
  const testEvent = {
    name: "Test Event",
    description: "This is a test event",
    date: "2023-10-10",
  };

  // Create a connection to the test database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Insert the test event into the database
  await connection.query("INSERT INTO events SET ?", testEvent);

  // Release the connection back to the pool
  await connection.release();
});

/**
 * Clean up the test environment after all tests have run.
 *
 * This function removes the test event from the database to ensure a clean state.
 */
afterAll(async () => {
  // Create a connection to the test database for cleanup
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Delete the test event from the database
  await connection.query("DELETE FROM events WHERE name = ?", ["Test Event"]);

  // Release the connection back to the pool
  await connection.release();
});

/**
 * Test suite for the Event Service.
 *
 * This suite contains tests that verify the functionality of the event service.
 */
describe("Event Service", () => {
  /**
   * Test case: should create an event.
   *
   * This test verifies that an event can be created and that an event ID is returned.
   */
  it("should create an event", async () => {
    // Define the data for a new event
    const eventData = {
      name: "New Event",
      description: "This is a new event",
      date: "2023-10-11",
    };

    // Call the createEvent function and expect an event ID to be returned
    const eventId = await eventService.createEvent(eventData);
    expect(eventId).toBeDefined();
  });

  /**
   * Test case: should get all events.
   *
   * This test verifies that all events can be retrieved and that the result is not empty.
   */
  it("should get all events", async () => {
    // Call the getAllEvents function and expect a non-empty array of events
    const events = await eventService.getAllEvents();
    expect(events.length).toBeGreaterThan(0);
  });

  /**
   * Test case: should get an event by ID.
   *
   * This test verifies that a specific event can be retrieved by its ID.
   */
  it("should get an event by ID", async () => {
    // Retrieve all events and get the ID of the first event
    const events = await eventService.getAllEvents();
    const eventId = events[0].event_id;

    // Call the getEventById function and verify the returned event
    const event = await eventService.getEventById(eventId);
    expect(event).toBeDefined();
    expect(event.event_id).toBe(eventId);
  });

  /**
   * Test case: should update an event.
   *
   * This test verifies that an event can be updated and that the changes are reflected in the database.
   */
  it("should update an event", async () => {
    // Retrieve all events and get the ID of the first event
    const events = await eventService.getAllEvents();
    const eventId = events[0].event_id;

    // Define the updated data for the event
    const updatedEventData = {
      name: "Updated Event",
      description: "This event has been updated",
      date: "2023-10-12",
    };

    // Call the updateEvent function to update the event
    await eventService.updateEvent(eventId, updatedEventData);

    // Retrieve the updated event and verify the changes
    const updatedEvent = await eventService.getEventById(eventId);
    expect(updatedEvent.name).toBe(updatedEventData.name);
    expect(updatedEvent.description).toBe(updatedEventData.description);
    expect(updatedEvent.date).toBe(updatedEventData.date);
  });

  /**
   * Test case: should delete an event.
   *
   * This test verifies that an event can be deleted and that it no longer exists in the database.
   */
  it("should delete an event", async () => {
    // Define the data for an event to be deleted
    const eventData = {
      name: "Event to Delete",
      description: "This event will be deleted",
      date: "2023-10-13",
    };

    // Create the event and get its ID
    const eventId = await eventService.createEvent(eventData);

    // Call the deleteEvent function to delete the event
    await eventService.deleteEvent(eventId);

    // Verify that the event no longer exists in the database
    const deletedEvent = await eventService.getEventById(eventId);
    expect(deletedEvent).toBeUndefined();
  });
});
