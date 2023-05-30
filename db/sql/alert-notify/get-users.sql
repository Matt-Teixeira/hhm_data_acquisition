-- WE ONLY WANT ACTIVE USERS TO BE ASSESSED FOR NOTIFICATIONS
SELECT
   email_address,
   notify_email,
   phone_number,
   notify_sms,
   system_list_config
FROM
   users u
WHERE
   u.email_address IN ('jonathan.pope@avantehs.com');

-- WHERE
--    u.email_address IN ('jonathan.pope@avantehs.com', 'Ryan.Anderson@avantehs.com');

-- WHERE
--    u.status = 'active'
-- AND
--    u.system_list_config IS NOT NULL;