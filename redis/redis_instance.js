("use strict");
const { log } = require("../logger");
const redis = require("redis");

async function initRedis(PORT, REDIS_IP) {
  // SETUP ENV BASED RESOURCES -> REDIS CLIENT, JOB SCHEDULES
  // BUG-005: node-redis v4 retries a failed connect INDEFINITELY by default,
  // so an unreachable Redis leaves `connect()` pending forever. The run then
  // never reaches finalizeRun -- which is where index.js arms its 30s
  // force-exit failsafe -- so the container hangs holding its flock and every
  // later cron fire is skipped by `flock -n`, with no run record written at
  // all. Bounding both the socket connect and the retry count turns that
  // silent hang into an ordinary error the existing catch paths already
  // handle (E-logged, run degrades to partial, honest non-zero exit).
  // Redis is a container on the same docker network -- a healthy connect is
  // sub-millisecond, so 5s is already generous. Worst case here is ~15s
  // (3 attempts x 5s + backoff) before the run fails honestly.
  const CONNECT_TIMEOUT_MS = 5_000;
  const MAX_RECONNECT_ATTEMPTS = 2;

  const clienConfig = {
    socket: {
      port: PORT,
      host: REDIS_IP,
      connectTimeout: CONNECT_TIMEOUT_MS,
      reconnectStrategy: (retries) =>
        retries >= MAX_RECONNECT_ATTEMPTS
          ? new Error(
              `Redis unreachable at ${REDIS_IP}:${PORT} after ${MAX_RECONNECT_ATTEMPTS} attempts`
            )
          : Math.min((retries + 1) * 200, 1000),
    },
  };
  // Auth is opt-in: inert until REDIS_PW is set in this app's .env AND the
  // server has requirepass enabled (redis-admin rollout).
  if (process.env.REDIS_PW) clienConfig.password = process.env.REDIS_PW;

  const redisClient = redis.createClient(clienConfig);

  redisClient.on(
    "error",
    async (error) =>
      await log("error", "NA", "NA", "redisClient", `ON ERROR`, {
        // TODO: KILL APP?
        error: error,
      })
  );

  await redisClient.connect();

  return redisClient;
}

module.exports = initRedis;
