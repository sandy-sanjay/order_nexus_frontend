import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import orderApi from "../../api/OrderApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function TopProductsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    orderApi.topProducts()
      .then(res => {
        const labels = res.data.map(p => `Product ${p.productId}`);
        const values = res.data.map(p => p.soldQty);

        setChartData({
          labels,
          datasets: [
            {
              label: "Units Sold",
              data: values,
              backgroundColor: "#4CAF50",
            },
          ],
        });
      })
      .catch(() => setChartData(null));
  }, []);

  if (!chartData) return <p>No chart data available</p>;

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>📊 Top Selling Products</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default TopProductsChart;
