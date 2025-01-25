import React, { useState } from "react";
import AddSymbolForm from "./AddSymbolForm";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSymbol = (formData) => {
    setIsLoading(true);
    // Dispatch action to add symbol to the store
    // Example: store.dispatch(addSymbolAction(formData));
    setIsLoading(false);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Finance Portfolio</h1>
        <AddSymbolForm isLoading={isLoading} onAddSymbol={handleAddSymbol} />
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
