import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, InputBase, Hidden, fade, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SplitButton from "./SplitButton";

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
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    //здесь надо диспатичить экшен
    const handleClick = () => {
        console.info(`you clicked button with index ${selectedIndex}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
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
                            value="text"
                        />
                    </div>
                    {/*<IconButton color="secondary" aria-label="search-row" component="span" onClick={() => {*/}
                    {/*    console.log("dispatch text from here")}}>*/}
                    {/*    <SearchIcon/>*/}
                    {/*</IconButton>*/}
                    <SplitButton anchorRef={anchorRef} handleClick={handleClick}
                                 handleClose={handleClose} handleMenuItemClick={handleMenuItemClick}
                                 handleToggle={handleToggle} open={open} selectedIndex={selectedIndex}/>

                </Toolbar>


            </AppBar>
        </div>
    );
}

export default Header;