UPDATE 
   -- alert.notifications
   alert.notifications_dev_util_app
SET 
   sms_status = $1,
   sms_sid = $2
WHERE id = $3;