import { produce } from "immer";

const initialState = {
  rows: [],
  isLoaded: false,
  page: 0,
  totalPages: 1,
  pageSize: 25,
  selectedRow: null,
};

const compareValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA =
      key === "phone"
        ? a[key].match(/[0-9]+/g).join("")
        : typeof a[key] === "string"
        ? a[key].toUpperCase()
        : a[key];
    const varB =
      key === "phone"
        ? b[key].match(/[0-9]+/g).join("")
        : typeof b[key] === "string"
        ? b[key].toUpperCase()
        : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
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
    case "SORT_ROWS": {
      return produce(state, (draftState) => {
        draftState.rows.sort(
          compareValues(action.payload.type, action.payload.order)
        );
      });
    }
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
