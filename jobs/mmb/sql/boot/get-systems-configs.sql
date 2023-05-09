SELECT
    *
FROM
    systems
WHERE
    process_mag IS TRUE
    OR process_edu IS TRUE
ORDER BY
    id;