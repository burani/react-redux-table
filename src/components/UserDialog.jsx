import React from 'react';
import {Dialog, DialogTitle, List, ListItem, ListItemText} from "@material-ui/core";



function UserDialog({handleListItemClick, open}) {
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choose table size</DialogTitle>
            <List>
                <ListItem button onClick={() => handleListItemClick("s")} key={"s"}>
                    <ListItemText primary={"Fetch small table"}/>
                </ListItem>
                <ListItem button onClick={() => handleListItemClick("l")} key={"l"}>
                    <ListItemText primary={"Fetch large table"}/>
                </ListItem>
            </List>
        </Dialog>
    );
}

export default UserDialog;