import "dotenv/config";

import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection, ConnectionStates } from "mongoose";
import { randomUUID } from "node:crypto";

const BASE_DB_NAME = "app-e2e-test";

let mongoServer: MongoMemoryServer | null = null;
const schemaId = randomUUID();

function generateUniqueDatabaseURI(uri: string, dbId: string): string {
  const url = new URL(uri);

  url.pathname = `/${BASE_DB_NAME}-${dbId}`;

  return url.toString();
}

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please provide a MONGODB_URI environment variable");
  }

  const uniqueDatabaseURI = generateUniqueDatabaseURI(
    process.env.MONGODB_URI,
    schemaId
  );

  process.env.MONGODB_URI = uniqueDatabaseURI;

  await connect(uniqueDatabaseURI);
});

afterAll(async () => {
  if (connection.readyState === ConnectionStates.connected) {
    await connection.dropDatabase();
    await connection.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }

  delete process.env.MONGODB_URI;
});
