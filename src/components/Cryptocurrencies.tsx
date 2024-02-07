import { Row, Col, Card, Input } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { cryptoResponse, useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function Cryptocurrencies({ simplified }: { simplified: boolean }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCrytops] = useState<
    cryptoResponse["data"]["coins"] | undefined
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCrytops(filteredData);
  }, [cryptosList, searchTerm]);

  if (!cryptos?.length || isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
            <Link to={`/coin/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(+crypto.price)}$</p>
                <p>Market Cap: {millify(+crypto.marketCap)}$</p>
                <p style={{ color: +crypto.change < 0 ? "red" : "green" }}>
                  Daily Change: {millify(+crypto.change)}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
