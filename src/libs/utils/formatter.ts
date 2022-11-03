const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "EST"
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
  timeZone: "EST"
});

export const formatDate = (dateStr: string | number | Date) => {
  const date = new Date(dateStr + " EST-1");
  const now = new Date(new Date().toLocaleString('en', {timeZone: 'America/New_York'}));
  let diff = Math.floor(Math.abs((now.getTime() - date.getTime()) / (1000 * 60)));
  if (diff < 60) return `${60 - diff} ${diff !== 1 ? "minutes" : "minute"} ago`;
  diff = Math.floor(diff / 60);
  if (diff < 24) return `${diff} ${diff !== 1 ? "hours" : "hour"} ago`;

  const formatted = `${dateFormatter.format(date)} @ ${timeFormatter.format(
    date
  )}`;
  return formatted;
};

export const formatNumber = (number: number | undefined) => {
  if (!number) return `${Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(0)}`;

  if (number < 0) number = 0;
  
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
