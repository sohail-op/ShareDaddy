import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_SERVICE_NAME,
    port: process.env.REDIS_PORT || 6379,
  });
  
  redis.connect(()=>{ console.log("Connected to Redis") });