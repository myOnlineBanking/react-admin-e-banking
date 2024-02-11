export const DateTimeFormat = (date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  let dateFormatted = new Intl.DateTimeFormat("en-US").format(date);
  return dateFormatted;
};
