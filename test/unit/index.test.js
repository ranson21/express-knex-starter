import * as api from "api";
import { config as env } from "dotenv";
import chalk from "chalk";

// Import Local Dependencies

// Import Mock Data

// Mock Modules
jest.mock("express");

// Instantiate Variables
let main;

describe("Express Knex Starter", () => {
  beforeEach(() => {
    // Spy On the main function
    main = jest.spyOn(api, "start");

    // Mock the return values
    jest.spyOn(global.console, "log").mockReturnValue("");
  });

  afterEach(() => {
    jest.restoreAllMocks();

    // Restore the Environment
    env();
  });
  /**
   * General
   */
  test("It Can Start the service", async next => {
    // Run the test
    main();

    // Assertions
    expect(console.log).toHaveBeenCalledWith(
      chalk.green("info:"),
      chalk.grey("Successfully Connected to:")
    );

    // Complete the Test
    next();
  });
});
