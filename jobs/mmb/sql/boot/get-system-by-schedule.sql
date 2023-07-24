SELECT
    *
from
    systems
where
    mmb_config -> 'rpp_configs' -> 0 -> 'schedule' = $1
    and (
        process_mag IS TRUE
        OR process_edu IS true
    )