import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    background: "#23594c",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#e5e7eb",
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center",
  },
};

const CountryDistribution = ({ data }) => {
  const map = {};

  data.forEach((item) => {
    const country = item.country || "Unknown";
    map[country] = (map[country] || 0) + 1;
  });

  const entries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Records by Country (Top 10)",
        data: values,
        backgroundColor: "rgba(34, 197, 94, 0.7)", // emerald
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 28,
        hoverBackgroundColor: "rgba(34, 197, 94, 1)",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Top Countries</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#e5e7eb",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
            tooltip: {
              titleColor: "#e5e7eb",
              bodyColor: "#e5e7eb",
              backgroundColor: "#020617",
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#cbd5f5",
                font: {
                  size: 11,
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                color: "#cbd5f5",
                font: {
                  size: 11,
                },
              },
              grid: {
                color: "rgba(255,255,255,0.08)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CountryDistribution;
