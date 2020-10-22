import { createSelector } from "reselect";

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

// filter selectors
export const selectSortBy = (state) => {
  return state.filters.sortBy;
};

export const selectSearchText = (state) => {
  return state.filters.searchText;
};

// table selectors
export const selectLoaded = (state) => {
  return state.table.isLoaded;
};

export const selectPage = (state) => {
  return state.table.page;
};

export const selectTotalPages = (state) => {
  return state.table.totalPages;
};

export const selectPageSize = (state) => {
  return state.table.pageSize;
};

export const selectSelectedRow = (state) => {
  return state.table.selectedRow;
};

export const selectRows = (state) => {
  return state.table.rows;
};

export const selectSortedRows = createSelector(
  [selectRows, selectSortBy],
  (rows, sortBy) => [...rows].sort(compareValues(sortBy.type, sortBy.order))
);

export const selectFilteredRows = createSelector(
  [selectSortedRows, selectSearchText],
  (rows, searchText) => {
    if (!searchText) return rows;
    if (!rows.length) return [];
    return rows.filter((o) =>
      Object.keys(o).some((k) => {
        return ("" + o[k]).toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }
);

export const selectPaginatedFilteredRows = createSelector(
  [selectFilteredRows, selectPage, selectPageSize],
  (rows, page, pageSize) =>
    rows.slice(page * pageSize, page * pageSize + pageSize)
);
