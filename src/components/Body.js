import React from "react";
import { useState, useEffect } from "react";
import RestroCard from "./RestroCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setListofRestaurants(
      json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    console.log(
      json.data.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //search-bar
  const [searchTerm, setSearchTerm] = useState("");
  console.log("Search Rendered");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search px-4">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                className="pl-1 border borer-solid border-black rounded-lg"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="px-4 py-1 bg-green-200 m-4 rounded-lg"
                type="submit"
                onClick={() => {
                  //filter logic
                  const filteredList = listofRestaurants.filter((res) =>
                    res?.info?.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  );
                  console.log("Button Clicked");
                  setFilteredRestaurants(filteredList);
                  console.log(filteredList);
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="items-center m-4 px-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => {
              console.log("Button Clicked");
              //filter logic
              const filteredList = listofRestaurants.filter(
                (res) => res.info.avgRating > 4.1
              );
              setFilteredRestaurants(filteredList);
              console.log(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
          <button
            className="top-rated-btn px-4 underline"
            onClick={() => {
              console.log("Button Clicked");
              //filter logic
              setFilteredRestaurants(listofRestaurants);
            }}
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div className="restaurant-container flex flex-wrap justify-center">
        {listofRestaurants.length === 0 ? (
          <Shimmer />
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestroCard resData={restaurant} key={restaurant.info.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
