const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium"
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short"
});

export const formatDate = (dateStr: string | number | Date) => {
  const date = new Date(dateStr);
  const formatted = `${dateFormatter.format(date)} @ ${timeFormatter.format(
    date
  )}`;
  return formatted;
};

export const formatNumber = (number: number) => {
  if (number >= 1_000_000) {
    return `${Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
      number/1_000_000
    )}M`;
  } else if (number >= 1_000) {
    return `${Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
      number/1_000
    )}k`;
  } else {
    return `${Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
      number
    )}`;
  }
};
