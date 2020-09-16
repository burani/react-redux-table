import React from 'react';
import {makeStyles, lighten, Toolbar, Typography, Tooltip, IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    title: {
        flex: "1 1 100%"
    }
}));

function TableToolbar({onAddButtonClick}) {

    const classes = useToolbarStyles();
    return (
        <Toolbar>
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div">
                Table
            </Typography>
            <Tooltip title="Add Row">
                <IconButton aria-label="add row" onClick={onAddButtonClick}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    );

}

export default TableToolbar;