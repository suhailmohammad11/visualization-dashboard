import { useEffect, useState } from "react";
import { fetchMeta } from "../../api/InsightAPI";
import "./FiltersPanelStyles.css"

const FiltersPanel = ({ filters, setFilters }) => {
  const [options, setOptions] = useState({
    end_year: [],
    topic: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    swot: [],
    country: [],
  });

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const fields = [
        "end_year",
        "topic",
        "sector",
        "region",
        "pestle",
        "source",
        "swot",
        "country",
      ];

      const results = await Promise.all(
        fields.map((field) => fetchMeta(field))
      );

      const newOptions = {};
      fields.forEach((field, index) => {
        newOptions[field] = results[index].data;
      });

      console.log("META OPTIONS:", newOptions); // 👈 add this

      setOptions(newOptions);
    } catch (error) {
      console.error("Error loading filter options", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const renderSelect = (label, name, values = []) => (
    <div className="render-select" >
      <label>{label}</label>
      <br />
      <select name={name} value={filters[name]} onChange={handleChange}>
        <option value="">All</option>
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );

 return (
  <div className="filters-panel" >
    {renderSelect("End Year", "end_year", options.end_year)}
    {renderSelect("Topic", "topic", options.topic)}
    {renderSelect("Sector", "sector", options.sector)}
    {renderSelect("Region", "region", options.region)}
    {renderSelect("PESTLE", "pestle", options.pestle)}
    {renderSelect("Source", "source", options.source)}
    {renderSelect("SWOT", "swot", options.swot)}
    {renderSelect("Country", "country", options.country)}
  </div>
);

};

export default FiltersPanel;
