import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 650,
    position: "relative",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

function RowDisplay({ selectedRow, onRowDisplayClose }) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onRowDisplayClose}
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>Selected user: </b>{" "}
            {selectedRow.firstName + " " + selectedRow.lastName}
          </Typography>
          {selectedRow.address ? (
            <div>
              <Typography variant="h5" component="h2">
                <b>Description: </b> {selectedRow.description}
              </Typography>
              <Typography variant="h5" component="h2">
                <b>Address: </b>
                {selectedRow.address.streetAddress}
              </Typography>
              <Typography variant="h5" component="h2">
                <b>City: </b>
                {selectedRow.address.city}
              </Typography>
              <Typography variant="h5" component="h2">
                <b>State/province: </b>
                {selectedRow.address.state}
              </Typography>
              <Typography variant="h5" component="h2">
                <b>Index: </b>
                {selectedRow.address.zip}
              </Typography>
            </div>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RowDisplay;
