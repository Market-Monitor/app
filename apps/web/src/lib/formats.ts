import { format, fromUnixTime } from "date-fns";

export const formatChartDate = (unixDate: number) => {
  const date = fromUnixTime(unixDate / 1000);
  return format(date, "MMM dd");
};
