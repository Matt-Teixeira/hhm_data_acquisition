UPDATE 
   -- alert.notifications
   alert.notifications_dev_util_app
SET 
   email_status = $1
WHERE 
   run_id = $2
AND
   job_id = $3;