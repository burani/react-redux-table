import { produce } from "immer";

const initialState = {
  rows: [],
  isLoaded: false,
  page: 0,
  totalPages: 1,
  pageSize: 25,
  selectedRow: null,
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROWS":
      return {
        ...state,
        rows: action.payload,
        totalPages: Math.floor(action.payload.length / state.pageSize),
        isLoaded: true,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: action.payload,
        totalPages: Math.ceil(state.rows.length / state.pageSize),
      };
    case "SET_LOADED":
      return {
        ...state,
        isLoaded: action.payload,
      };
    case "SET_SELECTED_ROW": {
      return {
        ...state,
        selectedRow: JSON.parse(JSON.stringify(action.payload)),
      };
    }
    case "ADD_ROW": {
      return produce(state, (draftState) => {
        draftState.rows.unshift(action.payload);
        draftState.page = 0;
      });
    }
    default:
      return state;
  }
};

export default table;
