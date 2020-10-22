import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import TableHeader from "./Tableheader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableToolbar from "./TableToolbar";
import {
  addRow,
  fetchRows,
  setPage,
  setPageSize,
  setSelectedRow,
  sortRows,
} from "../../redux/actions/table";
import { setSortBy } from "../../redux/actions/filters";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddForm from "../AddForm";
import RowDisplay from "./RowDisplay";
import UserDialog from "../UserDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: 700,
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
    width: 1,
  },
  progress: {
    position: "absolute",
    top: "50vh",
    right: "100vh",
  },
}));

function DataTable() {
  const [formOpen, setFormOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filteredRows, setFilteredRows] = React.useState([]);

  const dispatch = useDispatch();
  const page = useSelector(({ table }) => table.page);
  const pageSize = useSelector(({ table }) => table.pageSize);
  const rows = useSelector(({ table }) => table.rows);
  const isLoaded = useSelector(({ table }) => table.isLoaded);
  const selectedRowObj = useSelector(({ table }) => table.selectedRow);
  const sortBy = useSelector(({ filters }) => filters.sortBy);
  const searchText = useSelector(({ filters }) => filters.searchText);

  const handleClose = (value) => {
    dispatch(fetchRows(value));
    setDialogOpen(false);
  };

  const handleListItemClick = (value) => {
    handleClose(value);
  };

  const filterRows = (rows, searchText) => {
    if (!searchText) return rows;
    if (!rows.length) return [];
    return rows.filter((o) =>
      Object.keys(o).some((k) => {
        return ("" + o[k]).toLowerCase().includes(searchText.toLowerCase());
      })
    );
  };

  const onPageChange = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const onFormSubmit = (values) => {
    dispatch(addRow({ ...values, address: null, description: "" }));
    setFormOpen(false);
  };

  const onFormOpen = () => {
    setFormOpen(true);
  };
  const onFormClose = () => {
    setFormOpen(false);
  };

  const onChangeRowsPerPage = (event) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const OnColumnHeadClick = (event, property) => {
    const isAsc = sortBy.type === property && sortBy.order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    const newSortBy = { type: property, order: newOrder };
    dispatch(setSortBy(newSortBy));
  };

  const createOnColumnHeadClick = (property) => (event) => {
    OnColumnHeadClick(event, property);
  };

  const onRowDisplayClose = () => {
    dispatch(setSelectedRow(null));
  };
  const onRowClick = (obj) => {
    console.log(obj);
    if (selectedRowObj) {
      selectedRowObj.id + selectedRowObj.email === obj.id + obj.email
        ? dispatch(setSelectedRow(null))
        : dispatch(setSelectedRow(obj));
    } else {
      dispatch(setSelectedRow(obj));
    }
  };

  //фильтруем только когда изменяются rows, searchText
  React.useEffect(() => {
    setFilteredRows(filterRows(rows, searchText));
  }, [rows, searchText]);

  React.useEffect(() => {
    console.log("rendered first");
    setDialogOpen(true);
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(sortRows(sortBy));
  }, [sortBy, dispatch]);

  const headCells = [
    { id: "id", numeric: true, disablePadding: true, label: "Id" },
    {
      id: "firstName",
      numeric: false,
      disablePadding: false,
      label: "First name",
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: "Last name",
    },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  ];

  const paginatedRows = filteredRows.slice(
    page * pageSize,
    page * pageSize + pageSize
  ); //rows заменить на filteredRows
  const emptyRows =
    pageSize - Math.min(pageSize, filteredRows.length - page * pageSize);
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs />
        <Grid item xs={11}>
          {dialogOpen && (
            <UserDialog
              open={dialogOpen}
              handleClose={handleClose}
              handleListItemClick={handleListItemClick}
            />
          )}
          {isLoaded ? (
            <div className={classes.root}>
              {selectedRowObj && (
                <RowDisplay
                  selectedRow={selectedRowObj}
                  onRowDisplayClose={onRowDisplayClose}
                />
              )}

              <Paper className={classes.paper}>
                <TableToolbar onAddButtonClick={onFormOpen} />
                <TableContainer className={classes.container}>
                  <Table
                    stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table"
                  >
                    <TableHeader
                      headCells={headCells}
                      orderBy={sortBy.type}
                      order={sortBy.order}
                      createOnColumnHeadClick={createOnColumnHeadClick}
                    />
                    <TableBody>
                      {paginatedRows.map((row) => {
                        return (
                          <TableRow
                            hover
                            onClick={() => onRowClick(row)}
                            tabIndex={-1}
                            key={row.id + row.email}
                            selected={
                              selectedRowObj
                                ? row.id + row.email ===
                                  selectedRowObj.id + selectedRowObj.email
                                : false
                            }
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
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={filteredRows.length}
                  rowsPerPage={pageSize}
                  page={page}
                  onChangePage={onPageChange}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                />
              </Paper>
            </div>
          ) : (
            <CircularProgress
              color="secondary"
              className={classes.progress}
              size={70}
            />
          )}
        </Grid>
        <Grid item xs />
      </Grid>
      <AddForm open={formOpen} onSubmit={onFormSubmit} onClose={onFormClose} />
    </div>
  );
}

export default DataTable;
