
import React from "react";
import { AreaChartComponent } from "./charts/AreaChart";
import { BarChartComponent } from "./charts/BarChart";
import { PieChartComponent } from "./charts/PieChart";
import { BaseChartProps } from "./charts/types";

export interface ChartProps extends BaseChartProps {
  type: "area" | "bar" | "pie";
}

export function Chart({ type, ...props }: ChartProps) {
  if (type === "area") {
    return <AreaChartComponent {...props} />;
  }

  if (type === "bar") {
    return <BarChartComponent {...props} />;
  }

  if (type === "pie") {
    return <PieChartComponent {...props} />;
  }

  return null;
}
