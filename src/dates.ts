
export function isDateToday(inputDate) {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);

  return (
    currentDate.getFullYear() === inputDateObj.getFullYear() &&
    currentDate.getMonth() === inputDateObj.getMonth() &&
    currentDate.getDate() === inputDateObj.getDate()
  );
}
