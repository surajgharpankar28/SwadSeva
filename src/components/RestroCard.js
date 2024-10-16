import React from "react";
import { CON_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestroCard = (props) => {
  const { resData } = props;

  const { id, name, cuisines, avgRating, cloudinaryImageId, deliveryTime } =
    resData?.info;

  return (
    <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:shadow-xl dark:bg-gray-600 dark:text-white">
      <div className="h-50">
        <img
          className="rounded-lg"
          alt="res-img"
          src={CON_URL + cloudinaryImageId}
        />
      </div>
      <div>
        <h3 className="font-bold py-1.5 text-lg">{name}</h3>
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
