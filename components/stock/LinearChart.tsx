"use client";
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
} from "chart.js";
import { useSearchParams } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function tooltipColoring(tooltipItem: any) {
  console.log(tooltipItem.tooltip.labelColors[0].borderColor);
  return tooltipItem.tooltip.labelColors[0].borderColor;
}
function customXlabelColor(context: any) {
  if (context.index <= 5) {
    return "gray";
  } else {
    return "#5EDA42";
  }
}
const options = {
  responsive: true, // Prevent automatic resizing
  maintainAspectRatio: false, // Allow custom width/height
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
// dummy data
const labels = ["Week1", "Week2", "Week3", "Week4"];

const colors = [
  "#CCDF92", // Soft green
  "#FF9D23", // Warm orange
  "#E195AB", // Gentle pink
  "#DE3163", // Vibrant red
  "#6AB3A3", // Muted teal
  "#4B89DC", // Calm blue
  "#F4D35E", // Bright yellow
  "#9C6ADE", // Elegant purple
  "#52C3A7", // Fresh mint
  "#EF476F", // Bold coral
];
function LinearChart({ predictData }: { predictData: any }) {
  const searchParams = useSearchParams();
  const selectedProducts = searchParams.getAll("chartProductList");
  const displayedProducts = predictData.data.filter((item: any) =>
    selectedProducts.includes(item.ProductName)
  );

  const data = {
    labels,
    datasets: displayedProducts.map((item: any, i: number) => {
      return {
        label: item.ProductName,
        data: item.ReorderQuantities.map((i: number) => i),
        borderColor: i > 10 ? colors[10] : colors[i],
        backgroundColor: i > 10 ? colors[10] : colors[i],
      };
    }),
  };
  return <Line data={data} options={options} className=" max-w-full h-full" />;
}

export default LinearChart;
