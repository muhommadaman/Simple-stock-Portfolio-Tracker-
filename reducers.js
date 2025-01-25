import { ADD_TRANSACTION, DELETE_STOCK, FETCH_ALL_QUOTES } from './actions';

const initialState = {
  portfolio: [],
  isFetchingCount: 0,
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        portfolio: [...state.portfolio, action.payload],
      };
    case DELETE_STOCK:
      return {
        ...state,
        portfolio: state.portfolio.filter(stock => stock.symbol !== action.payload),
      };
    case FETCH_ALL_QUOTES:
      return {
        ...state,
        portfolio: action.payload,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
