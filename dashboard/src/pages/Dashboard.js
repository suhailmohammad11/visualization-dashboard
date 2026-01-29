import { useEffect, useState } from "react";
import { fetchInsights } from "../api/InsightAPI";
import FiltersPanel from "../components/filters/FiltersPanel";
import IntensityByYear from "../components/charts/IntensityByYear";
import LikelihoodTrend from "../components/charts/LikelihoodTrend";
import RelevanceByTopic from "../components/charts/RelevanceByTopic";
import CountryDistribution from "../components/charts/CountryDistribution";
import RegionIntensity from "../components/charts/RegionIntensity";
import "./DashboardStyles.css";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetchInsights(filters);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filters]);

  return (
    <div className="dashboard">
      <h1>Visualization Dashboard</h1>
      {loading && <p>Loading...</p>}
      <p>Total Records: {data.length}</p>

      <div className="filters-panel-header">
        <FiltersPanel filters={filters} setFilters={setFilters} />
      </div>

      <div className="charts">
        <div className="first-line">
          <div className="chart" id="intensity">
            <IntensityByYear data={data} />
          </div>
          <div className="chart" id="likelihood">
            <LikelihoodTrend data={data} />
          </div>
        </div>

        <div className="second-line">
          <div className="chart" id="relevance">
            <RelevanceByTopic data={data} />
          </div>
        </div>

        <div className="third-line">
          <div className="chart" id="country">
            <CountryDistribution data={data} />
          </div>
          <div className="chart" id="region">
            <RegionIntensity data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
