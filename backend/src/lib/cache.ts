// src/lib/mockRedis.ts

const redisStore = new Map<string, { value: string; expireAt?: number }>();

const redis = {
  set: (
    key: string,
    value: string,
    ex?: string,
    ttlInSeconds?: number
  ): Promise<"OK"> => {
    if (ex === "EX" && ttlInSeconds) {
      const expireAt = Date.now() + ttlInSeconds * 1000;
      redisStore.set(key, { value, expireAt });
    } else {
      redisStore.set(key, { value });
    }
    return Promise.resolve("OK");
  },

  get: (key: string): Promise<string | null> => {
    const entry = redisStore.get(key);
    if (!entry) return Promise.resolve(null);

    if (entry.expireAt && Date.now() > entry.expireAt) {
      redisStore.delete(key);
      return Promise.resolve(null);
    }

    return Promise.resolve(entry.value);
  },

  del: (key: string): Promise<number> => {
    const existed = redisStore.delete(key);
    return Promise.resolve(existed ? 1 : 0);
  },
};

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
