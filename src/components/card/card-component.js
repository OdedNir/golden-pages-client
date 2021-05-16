import React from "react";
import {
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 250,
    height: 200,
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    marginBottom: 8,
  },
}));

const CardComponent = (props) => {
  const { item } = props;
  const { type, name } = item;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.text} color="textSecondary">
          {type}
        </Typography>
        <Typography className={classes.text} variant="h5">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>some button</Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
