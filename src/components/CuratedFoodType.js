import React from "react";
import { CURATED_FOOD_TYPE } from "../utils/constants";
const CuratedFoodType = (props) => {
  const { curatedData } = props;

  return (
    <>
      <div className="hover:scale-105 transition-all duration-300 ease-in-out transform">
        <a aria-label="description of food type">
          <div style={{ height: "180px", width: "144px" }}>
            <img
              src={CURATED_FOOD_TYPE + curatedData.imageId}
              width="144"
              height="180"
              alt="description of food type"
            />
          </div>
        </a>
        <div></div>
      </div>
    </>
  );
};

export default CuratedFoodType;
