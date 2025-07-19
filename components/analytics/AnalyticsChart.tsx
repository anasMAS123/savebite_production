"use client";
interface itemProp {
  week: string;
  sales_predictions: number;
}
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useTranslations } from "next-intl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
function tooltipColoring(tooltipItem: any) {
  console.log(tooltipItem.tooltip.labelColors[0].borderColor);
  return tooltipItem.tooltip.labelColors[0].borderColor;
}
function customXlabelColor(context: any) {
  if (context.index < 0) {
    return "gray";
  } else {
    return "#5EDA42";
  }
}
const options = {
  responsive: true, // Prevent automatic resizing
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: customXlabelColor as any,
      },
    },
  },
  datasets: {
    line: {
      borderWidth: 3,
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: tooltipColoring as any,
      displayColors: false,
      yAlign: "bottom" as const,
      caretPadding: 10,
    },
    legend: {
      position: "top" as const,
    },
  },
};
const labels = ["Week1", "Week2", "Week3", "Week4"];

function AnalyticsChart({
  analyticsDataObject,
}: {
  analyticsDataObject: Record<string, any>;
}) {
  const t = useTranslations("Analytics");
  const {
    start_date = "",
    end_date = "",
    data: analyticsData = [],
  } = analyticsDataObject ?? [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: t("analytics"),
        data: analyticsData.map(
          (item: itemProp, index: number) => item.sales_predictions
        ),
        fill: true,
        borderColor: ({ chart }) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0.5, "#ce3cd5");
          gradient.addColorStop(0.5, "#ac3bea"); // Blue fading at the bottom
          return gradient;
        },
        backgroundColor: ({ chart }) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return null; // Ensure chart is ready

          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgb(253, 122, 238 ,0.2)"); // Green at the top
          gradient.addColorStop(1, "#ffffff"); // Blue fading at the bottom
          return gradient;
        },
      },
    ],
  };
  return <Line data={data} options={options} className=" w-full h-full" />;
}

export default AnalyticsChart;
