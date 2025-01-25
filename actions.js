import axios from 'axios';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_STOCK = 'DELETE_STOCK';
export const FETCH_ALL_QUOTES = 'FETCH_ALL_QUOTES';

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const deleteStock = (symbol) => async (dispatch) => {
  await axios.delete(`/api/stocks/${symbol}`);
  dispatch({ type: DELETE_STOCK, payload: symbol });
};

export const fetchAllQuotes = () => async (dispatch) => {
  const response = await axios.get('/api/stocks');
  dispatch({ type: FETCH_ALL_QUOTES, payload: response.data });
};
