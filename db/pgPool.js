// db/pg-pool.js
"use strict";

const fs = require("fs");
const path = require("path");
const pgp = require("pg-promise")();

function buildSsl() {
  const mode = (process.env.PG_SSLMODE || "disable").toLowerCase();

  if (mode === "disable") return false;

  if (mode === "require") {
    // encrypted but don’t verify CA
    return { rejectUnauthorized: false };
  }

  // verify-ca / verify-full — require a CA file if provided
  const caPath = process.env.PG_SSL_PATH;
  if (caPath) {
    const resolved = path.isAbsolute(caPath) ? caPath : path.resolve(process.cwd(), caPath);
    if (fs.existsSync(resolved)) {
      return { ca: fs.readFileSync(resolved, "utf8"), rejectUnauthorized: true };
    } else {
      console.warn(`[pg] PG_SSL_PATH not found at ${resolved}; falling back to 'require'.`);
      return { rejectUnauthorized: false };
    }
  } else {
    console.warn("[pg] PG_SSLMODE=verify-* but PG_SSL_PATH not set; falling back to 'require'.");
    return { rejectUnauthorized: false };
  }
}

const config = {
  // NOTE: use PGHOST/PGPORT/etc. (what you pass in docker run)
  host: process.env.PGHOST || "pg_db",
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || "dev",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD,
  ssl: buildSsl(),
  // DB-001 -- fleet pool standard (decided 2026-08-27), previously applied to
  // utils/db/pg-pool.js only. A hung connect must ERROR by 10s: with no
  // timeout an unreachable DB hangs the run FOREVER, the run never reaches
  // finalizeRun so no row lands in util.app_run_logs, the empty cron .out
  // reads as "never ran", and `flock -n` then silently skips every later
  // cycle of that job. This pool is the first query for mmb, demo_systems,
  // the hhm config/credential reads and ip_sec.
  max: 15,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
  application_name: process.env.PG_APP_NAME || "pg_manage",
};

module.exports = pgp(config);
