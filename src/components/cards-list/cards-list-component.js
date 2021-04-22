import React from "react";
import CardComponent from "../card/card-component";

import "./cards-list-component.scss";

const CardsListComponent = (props) => {
  const { data } = props;

  const renderCard = (item, index) => {
    return <CardComponent item={item} key={index} />;
  };

  const renderCards = () => {
    return data.map((item, index) => renderCard(item, index));
  };

  return <div className="cards-list-component">{renderCards()}</div>;
};

export default CardsListComponent;
