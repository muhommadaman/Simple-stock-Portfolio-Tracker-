import * as React from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import AddSymbolForm from "./AddSymbolForm";
import PortfolioNav from "./PortfolioNav";
import { deleteStock } from "./actions"; // Assuming this action exists

export default function Portfolio() {
  const dispatch = useDispatch();
  const portfolio = useSelector(state => state.portfolio);
  const isLoading = useSelector(state => state.isFetchingCount > 0);

  function handleDeleteStock(symbol) {
    dispatch(deleteStock(symbol));
  }

  return (
    <>
      <PortfolioNav />
      <Container fluid>
        <Row className="mb-3 mt-3">
          <Col>
            <AddSymbolForm isLoading={isLoading} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Current Stock Holdings</h3>
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
                    <td>${stock.price.toFixed(2)}</td>
                    <td>
                      <Button color="danger" onClick={() => handleDeleteStock(stock.symbol)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
