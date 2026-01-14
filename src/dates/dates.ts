export function is_date_today(inputDate: Date) {
  const current_date = new Date(new Date().toISOString().split('T')[0]);
  const input_date_obj = new Date(inputDate);

  return (
    current_date.getFullYear() === input_date_obj.getFullYear() &&
    current_date.getMonth() === input_date_obj.getMonth() &&
    current_date.getDate() === input_date_obj.getDate()
  );
}
