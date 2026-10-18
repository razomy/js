export function isDateToday(inputDate: Date) {
  const currentDate = new Date(new Date().toISOString().split('T')[0]);
  const inputDateObj = new Date(inputDate);

  return (
    currentDate.getFullYear() === inputDateObj.getFullYear() &&
    currentDate.getMonth() === inputDateObj.getMonth() &&
    currentDate.getDate() === inputDateObj.getDate()
  );
}
