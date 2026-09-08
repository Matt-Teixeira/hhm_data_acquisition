-- scripts/scrub-historical-credentials.sql -- SEC-011 (2026-09-08)
--
-- ONE-OFF, IN-PLACE SCRUB of plaintext device credentials that pre-SEC-002 runs
-- (2026-08-19 .. 2026-09-02 16:30 UTC) wrote into three database sinks via node's
-- execFile error message ("Command failed: ... <script> <ip> <user> <password> /workspace/files/<sme>"):
--   util.app_run_logs        verbose_log + warn_error_logs   (json)   3,760 rows / 55,471 matches per column
--   incidents.error_events   err_msg + raw_event             (text/jsonb) 55,471 rows
--   incidents.incidents      sample_message                  (text)     317 rows
--
-- SAFE BY DEFAULT: everything runs in ONE transaction and ROLLS BACK unless invoked with
--     psql ... -v COMMIT=1 -f scripts/scrub-historical-credentials.sql
-- so the first run is a rehearsal that prints the residual counts it WOULD leave.
--
-- BEFORE COMMITTING (precedent: BACKLOG 2a / 5c -- snapshot, convert, verify):
--     pg_dump -Fc -t util.app_run_logs_2026_08 -t util.app_run_logs_2026_09 \
--             -t incidents.error_events -t incidents.incidents  -f pre-scrub-$(date +%F).dump
-- Coordinate with the incident-engine owner: err_msg participates in its event fingerprinting.
-- Only HISTORICAL rows change; the engine advances from a watermark and will not re-scan them.
--
-- PATTERN SAFETY: the credential segment is bounded to ONE JSON string (quote excluded,
-- escapes allowed, <=200 chars), so PostgreSQL's greediness rules cannot make it span into
-- a neighbouring event. Proven on a synthetic multi-event string; measured dry run 2026-09-08:
-- avg 13-16 chars removed per match, json/jsonb re-cast valid 300/300 on samples.
\set ON_ERROR_STOP on
\set P '$rx$(read/sh/(?:GE|Philips)/[^ "]+ \\d{1,3}(?:\\.\\d{1,3}){3} )(?!\\*\\*\\* \\*\\*\\* )(?:[^"\\\\]|\\\\.){1,200}?( /workspace/files/)$rx$'

BEGIN;
SET LOCAL statement_timeout = '45min';

UPDATE util.app_run_logs
   SET verbose_log     = regexp_replace(verbose_log::text,     :P, '\1*** ***\2', 'g')::json,
       warn_error_logs = regexp_replace(warn_error_logs::text, :P, '\1*** ***\2', 'g')::json
 WHERE app_name = 'data_acquisition' AND inserted_at < '2026-09-02 16:30+00'
   AND (verbose_log::text ~ :P OR warn_error_logs::text ~ :P);

UPDATE incidents.error_events
   SET err_msg   = regexp_replace(err_msg,          :P, '\1*** ***\2', 'g'),
       raw_event = regexp_replace(raw_event::text,  :P, '\1*** ***\2', 'g')::jsonb
 WHERE err_msg ~ :P OR raw_event::text ~ :P;

UPDATE incidents.incidents
   SET sample_message = regexp_replace(sample_message, :P, '\1*** ***\2', 'g')
 WHERE sample_message ~ :P;

-- VERIFY: every residual count must be 0 before this is worth committing.
\echo --- residual credential-shaped rows per sink (must all be 0) ---
SELECT 'util.app_run_logs.verbose_log'      AS sink, count(*) AS residual FROM util.app_run_logs      WHERE app_name='data_acquisition' AND verbose_log::text ~ :P
UNION ALL SELECT 'util.app_run_logs.warn_error_logs',        count(*) FROM util.app_run_logs      WHERE app_name='data_acquisition' AND warn_error_logs::text ~ :P
UNION ALL SELECT 'incidents.error_events.err_msg',           count(*) FROM incidents.error_events WHERE err_msg ~ :P
UNION ALL SELECT 'incidents.error_events.raw_event',         count(*) FROM incidents.error_events WHERE raw_event::text ~ :P
UNION ALL SELECT 'incidents.incidents.sample_message',       count(*) FROM incidents.incidents    WHERE sample_message ~ :P;

\if :{?COMMIT}
  COMMIT;
  \echo COMMITTED -- scrub applied.
\else
  ROLLBACK;
  \echo ROLLED BACK (rehearsal). Re-run with -v COMMIT=1 to apply.
\endif
