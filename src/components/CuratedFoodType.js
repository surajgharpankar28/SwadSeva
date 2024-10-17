import React from "react";
import { CURATED_FOOD_TYPE } from "../utils/constants";
const CuratedFoodType = (props) => {
  const { curatedData } = props;

  //   console.log("Curated Card" + curatedData.imageGridCards?.info[0]?.id);
  return (
    <>
      <div>
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
