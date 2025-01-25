import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockPrice } from './StockService'; // Import the StockService
import { deleteStock } from './actions'; // Import the delete action

const Dashboard = () => {
  const portfolio = useSelector(state => state.portfolio);
  const [stockPrices, setStockPrices] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = {};
      for (const stock of portfolio) {
        prices[stock.symbol] = await fetchStockPrice(stock.symbol);
      }
      setStockPrices(prices);
    };

    if (portfolio.length > 0) {
      fetchPrices();
    }
  }, [portfolio]);

  const totalValue = portfolio.reduce((acc, stock) => acc + (stockPrices[stock.symbol] || 0) * stock.shares, 0);
  const topStock = portfolio.reduce((prev, current) => (prev.price * prev.shares > current.price * current.shares) ? prev : current, {});

  const handleDelete = (symbol) => {
    dispatch(deleteStock(symbol));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Portfolio Dashboard</h2>
          {portfolio.length === 0 ? (
            <Card>
              <CardBody>
                <CardTitle>No Stocks in Portfolio</CardTitle>
                <CardText>Please add stocks to your portfolio.</CardText>
              </CardBody>
            </Card>
          ) : (
            <>
              <Card>
                <CardBody>
                  <CardTitle>Total Portfolio Value</CardTitle>
                  <CardText>${totalValue.toFixed(2)}</CardText>
                </CardBody>
              </Card>
              <Table striped>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map(stock => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.shares}</td>
                      <td>${stockPrices[stock.symbol]?.toFixed(2) || 'N/A'}</td>
                      <td>
                        <Button color="warning" onClick={() => {/* Implement edit functionality */}}>Edit</Button>
                        <Button color="danger" onClick={() => handleDelete(stock.symbol)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {portfolio.length > 0 && topStock.symbol && (
                <Card>
                  <CardBody>
                    <CardTitle>Top Performing Stock</CardTitle>
                    <CardText>{topStock.symbol} - ${stockPrices[topStock.symbol]?.toFixed(2) || 'N/A'} ({topStock.shares} shares)</CardText>
                  </CardBody>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
