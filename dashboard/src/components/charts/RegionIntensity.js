import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RegionIntensity = ({ data }) => {
  const map = {};

  data.forEach((item) => {
    const region = item.region || "Unknown";
    if (!map[region]) {
      map[region] = { total: 0, count: 0 };
    }
    map[region].total += item.intensity || 0;
    map[region].count += 1;
  });

  const entries = Object.entries(map)
    .map(([k, v]) => [k, Math.round(v.total / v.count)])
    .sort((a, b) => b[1] - a[1]);

  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Intensity by Region",
        data: values
      }
    ]
  };

  const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    background: "#0f172a",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
  },
  title: {
    color: "#e5e7eb",
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center"
  }
};
  return (
 
              <div style={styles.container}>
                  <h3 style={styles.title}>Region vs Intensity</h3>
                      <Bar data={chartData} />
               </div>
  );
};

export default RegionIntensity;
