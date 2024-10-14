import SearchBar from "./SearchBar";
import RestroCard from "./RestroCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";

const Body = () => {
  //Local State variable - Super powerful variable

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
      <div className="filter">
        <div className="search">
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
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
        <div className="filter-btns">
          <button
            className="top-rated-btn"
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
            className="top-rated-btn"
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
      <div className="restaurant-container">
        {/*  If listofRestaurants.length === 0, it renders the Shimmer; otherwise, it renders the restaurant cards. */}
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
