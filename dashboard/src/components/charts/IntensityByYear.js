import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IntensityByYear = ({ data }) => {
  const map = {};

  data.forEach((item) => {
    const year = item.end_year || "Unknown";
    if (!map[year]) {
      map[year] = { total: 0, count: 0 };
    }
    map[year].total += item.intensity || 0;
    map[year].count += 1;
  });

  const labels = Object.keys(map).sort();
  const values = labels.map(
    (y) => Math.round(map[y].total / map[y].count)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Intensity",
        data: values
      }
    ]
  };

  return (
      <div style={styles.container}>
          <h3 style={styles.title}>Average Intensity</h3>
            <Bar data={chartData} />
        </div>
    
  );
};

export default IntensityByYear;
