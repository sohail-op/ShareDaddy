// import Redis from "ioredis";

// export const redis = new Redis({
//     host: process.env.REDIS_SERVICE_NAME,
//     port: process.env.REDIS_PORT || 6379,
//   });
  
//   redis.connect(()=>{ console.log("Connected to Redis") });

import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL); // Use full connection string
  redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });