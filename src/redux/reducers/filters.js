const initialState = {
    sortBy: {
        type: 'id',
        order: 'asc'
    }
};

const filters = (state = initialState, action) => {
    if (action.type === 'SET_SORT_BY') {
        return {
            ...state,
            sortBy: action.payload
        };
    } else {
        return state;
    }
};

export default filters;
