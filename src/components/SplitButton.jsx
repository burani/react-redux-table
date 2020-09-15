import React from 'react';
import {ButtonGroup, Button, Popper, Grow, ClickAwayListener, Paper, MenuList, MenuItem, fade} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {makeStyles} from "@material-ui/core/styles";


const options = ['Small table', 'Large table'];

//TODO: поменять цвет secondary в theme
const useStyles = makeStyles((theme) => ({
    splitButton: {
        whiteSpace: "nowrap"
    }
}));


function SplitButton({anchorRef, handleClick, selectedIndex, open, handleClose, handleToggle, handleMenuItemClick}) {
    const classes = useStyles();
    return (
        <div>
            <ButtonGroup disableElevation variant="contained" color="secondary" ref={anchorRef}
                         aria-label="split button">
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    color="secondary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>

    );
}

export default SplitButton;