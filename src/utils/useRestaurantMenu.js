import React from "react";
import { MENU_API } from "../utils/constants";
import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    //console.log("MENU API Link = " + MENU_API + resId);
    const data = await fetch(MENU_API + resId);
    if (!data.ok) {
      const err = data.status;
      throw new Error(err);
    } else {
      const json = await data.json();
      setResInfo(json.data);
    }
  };
  return resInfo;
};

export default useRestaurantMenu;
