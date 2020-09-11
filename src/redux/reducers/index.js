import {combineReducers} from "redux";
import filters from "./filters";
import table from "./table"

const rootReducer = combineReducers({
    filters,
    table
});

export default rootReducer;