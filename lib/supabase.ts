// ─── MongoDB native driver client ────────────────────────────────────────────
// Connects to local MongoDB (MongoDB Compass on localhost:27017)
// Connection string is set via MONGODB_URI in .env.local

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DATABASE ?? "placement-coach";

// ─── Connection singleton (prevents new connections on every hot-reload) ──────
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

async function getDb(): Promise<Db> {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
    await global._mongoClient.connect();
  }
  return global._mongoClient.db(dbName);
}

// ─── DB helpers (same names as before — no API route changes needed) ──────────

export async function saveResumeAnalysis(data: object) {
  try {
    const db = await getDb();
    await db.collection("resume_analyses").insertOne({
      ...data,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("[mongodb] saveResumeAnalysis error:", error);
  }
}

export async function saveInterviewSession(data: object) {
  try {
    const db = await getDb();
    await db.collection("interview_sessions").insertOne({
      ...data,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("[mongodb] saveInterviewSession error:", error);
  }
}

export async function saveRoadmap(data: object) {
  try {
    const db = await getDb();
    await db.collection("roadmaps").insertOne({
      ...data,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("[mongodb] saveRoadmap error:", error);
  }
}
