import axios from 'axios'
//const
const urls = {
    s: 'http://www.filltext.com/?rows=32&id=%7Bnumber%' +
        '7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7B' +
        'addressObject%7D&description=%7Blorem%7C32%7D',
    l: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%' +
        '7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7B' +
        'addressObject%7D&description=%7Blorem%7C32%7D'
};

//ACTION CREATORS
export const setRows = (payload) => ({
    type: "SET_ROWS",
    payload
});

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload
});

export const sortRows = (payload) => ({
    type: "SORT_ROWS",
    payload
});

export const filterRows = (payload) => ({
    type: "FILTER_ROWS",
    payload
});

export const setPage = (payload) => ({
    type: "SET_PAGE",
    payload
});

export const setPageSize = (payload) => ({
    type: "SET_PAGE_SIZE",
    payload
});

export const addRow = (payload) => ({
    type: "ADD_ROW",
    payload
});

export const setSelectedRow = (payload) => ({
    type: "SET_SELECTED_ROW",
    payload
});


//THUNKS
//contentSize = s/l
export const fetchRows = (contentSize) => (dispatch) => {
    axios.get(urls[contentSize]).then((res) => {
        dispatch(setRows(res.data));
    })
};





