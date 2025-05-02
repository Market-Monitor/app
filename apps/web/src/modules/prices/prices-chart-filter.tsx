import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/ui/select";

export const chartDatesFilter = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Last 7 Days",
    value: "last7days",
  },
  {
    label: "Last 30 Days",
    value: "last30days",
  },
] as const;

export type ChartDatesFilter = (typeof chartDatesFilter)[number]["value"];

export default function PricesChartFilter(props: {
  value: ChartDatesFilter;
  onChange: (value: ChartDatesFilter) => void;
}) {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {chartDatesFilter.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
