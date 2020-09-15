import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Paper, TableContainer, Table, TableBody, TablePagination, TableRow, TableCell} from "@material-ui/core";
import TableHeader from "./Tableheader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableToolbar from "./TableToolbar";
import {fetchRows, setPage, setPageSize, sortRows} from "../redux/actions/table";
import {setSortBy} from "../redux/actions/filters";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    container: {
        maxHeight: 700
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

function DataTable(props) {

    const [sortIndex, setSortIndex] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const dispatch = useDispatch();

    const page = useSelector(({table}) => table.page);
    const totalPages = useSelector(({table}) => table.totalPages);
    const pageSize = useSelector(({table}) => table.pageSize);
    const sortBy = useSelector(({filters}) => filters.sortBy);
    const rows = useSelector(({table}) => table.rows);
    const isLoaded = useSelector(({table}) => table.isLoaded);


    const onPageChange = (event, newPage) => {
        dispatch(setPage(newPage));
    };

    const onChangeRowsPerPage = (event) => {
        debugger;

        dispatch(setPageSize(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

    const OnColumnHeadClick = (event, property) => {
        const isAsc = sortBy.type === property && sortBy.order === 'asc';
        const newOrder = isAsc? 'desc': 'asc';
        const newSortBy = {type: property, order: newOrder};
        dispatch(setSortBy(newSortBy));
    };

    //возвращает нам метод, который вызывает OnColumnHeadClick
    const createOnColumnHeadClick = (property) => (event) => {
        OnColumnHeadClick(event, property);
    };

    const onRowClick = (rowId) => {
        setSelectedRow(rowId);
    };

    React.useEffect(() => {
        console.log("rendered first");
        dispatch(fetchRows("s"));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(sortRows(sortBy));
    }, [sortBy, dispatch]);

    const headCells = [
        {id: 'id', numeric: true, disablePadding: true, label: 'Id'},
        {id: 'firstName', numeric: false, disablePadding: false, label: 'First name'},
        {id: 'lastName', numeric: false, disablePadding: false, label: 'Last name'},
        {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
        {id: 'phone', numeric: false, disablePadding: false, label: 'Phone'},
    ];


    const emptyRows = pageSize - Math.min(pageSize, rows.length - page * pageSize);
    const paginatedRows = rows.slice(page * pageSize, page * pageSize + pageSize);
    const classes = useStyles();
    return (
        <div>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={11}>
                    {isLoaded? <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <TableToolbar/>
                            <TableContainer className={classes.container}>
                                <Table
                                    stickyHeader
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size="medium"
                                    aria-label="enhanced table"
                                >
                                    <TableHeader headCells={headCells} orderBy={sortBy.type} order={sortBy.order}
                                                 createOnColumnHeadClick={createOnColumnHeadClick}/>
                                    <TableBody>
                                        {paginatedRows.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => onRowClick(row.id)}
                                                    tabIndex={-1}
                                                    key={row.id + row.email}
                                                    selected={row.id === selectedRow}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        id={row.id}
                                                        scope="row"
                                                        padding="none"
                                                        align="right"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell>{row.firstName}</TableCell>
                                                    <TableCell>{row.lastName}</TableCell>
                                                    <TableCell>{row.email}</TableCell>
                                                    <TableCell>{row.phone}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{height: 53 * emptyRows}}>
                                                <TableCell colSpan={6}/>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={pageSize}
                                page={page}
                                onChangePage={onPageChange}
                                onChangeRowsPerPage={onChangeRowsPerPage}
                            />
                        </Paper>
                    </div> : <CircularProgress color="secondary"/>}

                </Grid>
                <Grid item xs/>
            </Grid>

        </div>
    );
}

export default DataTable;


// {stableSort(rows, getComparator(order, orderBy))
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     .map((row, index) => {
//         const isItemSelected = isSelected(row.name);
//         const labelId = `enhanced-table-checkbox-${index}`;
//
//         return (
//             <TableRow
//                 hover
//                 onClick={(event) => handleClick(event, row.name)}
//                 role="checkbox"
//                 aria-checked={isItemSelected}
//                 tabIndex={-1}
//                 key={row.name}
//                 selected={isItemSelected}
//             >
//                 <TableCell padding="checkbox">
//                     <Checkbox
//                         checked={isItemSelected}
//                         inputProps={{"aria-labelledby": labelId}}
//                     />
//                 </TableCell>
//                 <TableCell
//                     component="th"
//                     id={labelId}
//                     scope="row"
//                     padding="none"
//                 >
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//         );
//     })}

// {emptyRows > 0 && (
//     <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
//         <TableCell colSpan={6}/>
//     </TableRow>
// )}