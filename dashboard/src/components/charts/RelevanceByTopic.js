import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
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

ChartJS.register(ArcElement, Tooltip, Legend);

const RelevanceByTopic = ({ data }) => {
  const map = {};

  data.forEach((item) => {
    const topic = item.topic || "Unknown";
    if (!map[topic]) {
      map[topic] = 0;
    }
    map[topic] += item.relevance || 0;
  });

  // Take top 10 topics for readability
  const entries = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Relevance by Topic",
        data: values
      }
    ]
  };

  return (
    
                  <div style={styles.container}>
                      <h3 style={styles.title}>Relevance by Topic (Top 10)</h3>
                          <Pie data={chartData} />
                   </div>
  );
};

export default RelevanceByTopic;
