import React, { useState, useEffect } from "react";
import map from "lodash/map";
import { Button } from "@material-ui/core";

import CardComponent from "../card/card-component";

import "./cards-list-component.scss";

const SIZE = 6;

const CardsListComponent = (props) => {
  const { user } = props;
  const [type, setType] = useState(props.type);
  const [data, setData] = useState([]);
  const [size, setSize] = useState(SIZE);
  const [page, setPage] = useState(0);
  const [isMoreAvailable, setIsMoreAvailable] = useState(false);

  const getData = async () => {
    const { space, email } = user.userId;

    const itemsEndPoint = `${process.env.API_ENDPOINT}/twins/items`;
    const withType = type ? "/" + type : "";

    const response = await fetch(
      `${itemsEndPoint}/${space}/${email}${withType}?size=${size}&page=${page}`
    );

    const result = await response.json();

    setIsMoreAvailable(result.length >= SIZE && result.length !== 0);

    result && setData([...data, ...result]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const renderCard = (item, index) => {
    return <CardComponent item={item} key={index} />;
  };

  const renderCards = () => {
    return map(data, (item, index) => renderCard(item, index));
  };

  useEffect(() => {
    getData();
  }, [type, page]);

  return (
    <div className="cards-list-component">
      <div className="card-list-wrapper">{renderCards()}</div>

      {isMoreAvailable && (
        <div className="button-wrapper" onClick={loadMore}>
          <Button>Load more</Button>
        </div>
      )}
    </div>
  );
};

export default CardsListComponent;
