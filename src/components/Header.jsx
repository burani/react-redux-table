import React from 'react';
import {AppBar, fade, Hidden, IconButton, InputBase, makeStyles, Toolbar, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch} from "react-redux";
import {updateSearchText} from "../redux/actions/filters";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Header() {
    const [searchText, setSearchText] = React.useState("");
    const dispatch = useDispatch();

    const onSearchTextChange = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };

    const onFilterButtonClick = () => {
        dispatch(updateSearchText(searchText));
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">

                <Toolbar>
                    <Typography variant="h5">
                        <Hidden smDown>
                            React-Redux-Table
                        </Hidden>
                    </Typography>
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            value={searchText}
                            onChange={onSearchTextChange}
                        />
                    </div>
                    <IconButton color="secondary" aria-label="search-row" component="span"
                                onClick={onFilterButtonClick}>
                        <SearchIcon/>
                    </IconButton>

                </Toolbar>


            </AppBar>
        </div>
    );
}

export default Header;