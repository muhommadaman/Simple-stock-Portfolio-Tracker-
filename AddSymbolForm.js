import React, { useRef } from "react";
import { Button, Collapse, Form, FormGroup, Input, Label } from "reactstrap";
import formSerialize from "form-serialize";

export default function AddSymbolForm({ isLoading, onAddSymbol, onEditSymbol, initialData, stock }) {
  const [showTransactionData, setShowTransactionData] = React.useState(false);
  const formEl = useRef(null);

  React.useEffect(() => {
    if (initialData || stock) {
      const { symbol, type, shares, price, commission, date } = initialData || stock;
      formEl.current.symbol.value = symbol;
      formEl.current.type.value = type;
      formEl.current.shares.value = shares;
      formEl.current.price.value = price;
      formEl.current.commission.value = commission;
      formEl.current.date.value = date;
    }
  }, [initialData, stock]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = formSerialize(event.currentTarget, { hash: true, empty: true });

    if (initialData) {
      onEditSymbol({ ...formData, symbol: formData.symbol.toUpperCase() });
    } else {
      onAddSymbol({ ...formData, symbol: formData.symbol.toUpperCase() }); // Ensure this is called correctly
    }

    if (formEl.current != null) formEl.current.reset();
  }

  return (
    <div className="card">
      <div className="card-body">
        <Form action="/api" method="post" onSubmit={handleSubmit} innerRef={formEl}>
          <FormGroup>
            <Label for="symbol">Symbol</Label>
            <Input autoComplete="off" bsSize="sm" id="symbol" name="symbol" required />
          </FormGroup>
          {showTransactionData ? (
            <FormGroup>
              <Button
                color="link"
                onClick={() => setShowTransactionData(false)}
                size="sm"
                type="button"
              >
                - Remove transaction data
              </Button>
            </FormGroup>
          ) : (
            <FormGroup>
              <Button
                color="link"
                onClick={() => setShowTransactionData(true)}
                size="sm"
                type="button"
              >
                + Add transaction data
              </Button>
            </FormGroup>
          )}
          <Collapse isOpen={showTransactionData}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                bsSize="sm"
                className="form-control"
                disabled={!showTransactionData}
                id="type"
                name="type"
                required
                type="select"
              >
                <option>Buy</option>
                <option>Sell</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="shares">Shares</Label>
              <Input
                bsSize="sm"
                disabled={!showTransactionData}
                id="shares"
                min="0"
                name="shares"
                required
                step=".001"
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price/Amount</Label>
              <Input
                bsSize="sm"
                disabled={!showTransactionData}
                id="price"
                min="0"
                name="price"
                step=".01"
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">
                Date <small className="text-secondary">(Optional)</small>
              </Label>
              <Input
                bsSize="sm"
                disabled={!showTransactionData}
                id="date"
                name="date"
                type="date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="commission">
                Commission <small className="text-secondary">(Optional)</small>
              </Label>
              <Input
                bsSize="sm"
                disabled={!showTransactionData}
                id="commission"
                min="0"
                name="commission"
                step=".01"
                type="number"
              />
            </FormGroup>
          </Collapse>
          <FormGroup style={{ marginBottom: 0 }}>
            <Button color="primary" disabled={isLoading} size="sm" type="submit">
              {initialData ? "Update" : "Add to portfolio"}
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
