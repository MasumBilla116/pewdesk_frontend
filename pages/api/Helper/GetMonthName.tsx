export default function GetMonthName() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jul",
    "Aug",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  return month[date.getMonth()];
}
