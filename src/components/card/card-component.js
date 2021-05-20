import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import map from "lodash/map";
import startCase from "lodash/startCase";
import forEach from "lodash/forEach";

const SMALL = 300;
const LARGE = "fit-content";

const CardComponent = (props) => {
  const { item } = props;
  const { type, name, itemAttributes } = item;
  const { reviews } = itemAttributes;
  const [size, setSize] = useState(SMALL);

  const useStyles = makeStyles((theme) => ({
    card: {
      width: SMALL,
      height: size,
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    content: {
      overflow: "hidden",
    },
    title: {
      marginBottom: 4,
      fontSize: 14,
    },
    text: {
      marginBottom: 16,
    },
  }));

  const classes = useStyles();

  const renderItemAttributes = () => {
    return map(itemAttributes, (value, key) => {
      return key == "reviews" ? null : (
        <div key={key}>
          <Typography className={classes.title} color="textSecondary">
            {startCase(key)}
          </Typography>
          <Typography className={classes.text}>{value}</Typography>
        </div>
      );
    });
  };

  const renderReviews = () => {
    return forEach(reviews, (review, key) => {
      const { rating, text } = review;
      console.log(rating);
      console.log(text);
      return (
        <div key={key}>
          <Typography className={classes.title} color="textSecondary">
            {`Rating: ${rating}`}
          </Typography>
          <Typography className={classes.text}>{text}</Typography>
        </div>
      );
    });
  };

  const handleClick = () => {
    setSize(size == SMALL ? LARGE : SMALL);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary">
          {type}
        </Typography>
        <Typography className={classes.text} variant="h4">
          {name}
        </Typography>
        {size == LARGE && renderItemAttributes()}
        {/* {size == LARGE && renderReviews()} */}
      </CardContent>
      <CardActions>
        <Button onClick={handleClick}>
          {size == SMALL ? "More details" : "Less details"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
