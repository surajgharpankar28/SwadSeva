import React from "react";
import { CON_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestroCard = (props) => {
  const { resData } = props;

  const { id, name, cuisines, avgRating, cloudinaryImageId, deliveryTime } =
    resData?.info;

  return (
    <div className="res-card">
      <div>
        <img
          className="res-img"
          alt="res-img"
          src={CON_URL + cloudinaryImageId}
        />
      </div>
      <div>
        <h3>{name}</h3>
        <h5>{cuisines.join(", ")}</h5>
        <h5>{avgRating} stars</h5>
        <h5>ETA : {deliveryTime} mins</h5>
        <button>
          <Link target="_blank" to={"/restaurants/" + id}>
            View Menu
          </Link>
        </button>
      </div>
    </div>
  );
};

export default RestroCard;
