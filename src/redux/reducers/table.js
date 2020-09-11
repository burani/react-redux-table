const initialState = {
    rows: [],
    isLoaded: false,
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROWS':
            return {
                ...state,
                rows: action.payload,
                isLoaded: true,
            };

        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};

export default table;



