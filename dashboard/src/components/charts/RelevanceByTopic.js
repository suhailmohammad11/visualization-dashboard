import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const colors = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#a855f7",
  "#0ea5e9",
  "#f43f5e",
  "#84cc16",
];

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    background: "#202421",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#e5e7eb",
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center",
  },
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
        data: values,
        backgroundColor: colors,
        borderColor: "#0f172a",
        borderWidth: 2,
        spacing: 1,
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Relevance by Topic (Top 10)</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default RelevanceByTopic;
