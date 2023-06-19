function phil_ct_file_date_formatter(date_format) {
  const format = date_format;
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (format === "yyyymmdd") {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let new_date = year + month + day;
    return new_date;
  }
  if (format === "yyyy_mm_dd") {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let new_date = `${year}_${month}_${day}`;
    return new_date;
  }
  return null;
}

module.exports = phil_ct_file_date_formatter;
