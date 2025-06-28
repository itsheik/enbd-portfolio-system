// src/lib/redis.ts
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Set a value with optional expiration
async function setValue<T>(
  key: string,
  value: T,
  ttlInSeconds?: number
): Promise<"OK" | null> {
  try {
    if (ttlInSeconds) {
      return await redis.set(key, JSON.stringify(value), "EX", ttlInSeconds);
    }
    return await redis.set(key, JSON.stringify(value));
  } catch (error) {
    console.error("Redis set error:", error);
    return null;
  }
}

// Get a value by key
async function getValue<T>(key: string): Promise<T | null> {
  try {
    const stringValue = await redis.get(key);
    if (!stringValue) {
      return null;
    }
    return JSON.parse(stringValue) as T;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

async function deleteValue(key: string): Promise<boolean> {
  try {
    return (await redis.del(key)) === 1;
  } catch (error) {
    console.error("Redis delete error:", error);
    return false;
  }
}

const cache = {
  setValue,
  getValue,
  deleteValue,
};

export default cache;
