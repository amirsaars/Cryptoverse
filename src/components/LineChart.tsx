import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Row, Col, Typography } from "antd";
import { coinHistoryResponse } from "../services/cryptoApi";

const { Title } = Typography;

type LineChartProps = {
  coinHistory: coinHistoryResponse;
  currentPrice: string;
  coinName: string;
};

function LineChart({ coinHistory, currentPrice, coinName }: LineChartProps) {
  Chart.register(...registerables);
  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(+coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: {
            parsed: { y: number | bigint };
            formattedValue: string;
          }) => {
            console.log(context);
            if (
              context.formattedValue === "0" &&
              typeof context.parsed.y === "number"
            ) {
              return `${context.parsed.y.toExponential(4)} $`;
            } else {
              return `${context.formattedValue} $`;
            }
          },
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title
            level={5}
            className="price-change"
            style={{ color: +coinHistory.data.change < 0 ? "red" : "green" }}
          >
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
