import Redis from "ioredis";

const redisClinet = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClinet.on("connect", () => {
  console.log("Redis connected");
});

export default redisClinet;
