// External Dependencies
import { config as env } from "dotenv";
import express from "express";

// Configure Environment
env();

/**
 * Service Entrypoint
 */
export async function start() {
  // Instatiate the express object
  const app = express();

  // Start listening on the defined port
  await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server running at ${process.env.HOST}:${process.env.PORT}`);

  // Return the App and Server for assertions
  return { app };
}

// Start the service unless we are testing
if (process.env.NODE_ENV !== "test") {
  start();
}
