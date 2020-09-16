const initialState = {
    sortBy: {
        type: null,
        order: 'asc'
    },
    searchText: ''
};

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.payload
            };
        case 'UPDATE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload
            };

        default:
            return state;
    }
};

export default filters;
