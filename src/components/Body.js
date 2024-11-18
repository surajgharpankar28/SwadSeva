import React, { useRef } from "react";
import { useState, useEffect } from "react";
import RestroCard, { withPromotedLabel } from "./RestroCard";
import Shimmer, { CuratedFoodTypeShimmer } from "./Shimmer";
import CuratedFoodType from "./CuratedFoodType";
import { SWADSEVA_API_URL } from "../utils/constants";
import { CIcon } from "@coreui/icons-react";
import { cilSearch, cilXCircle } from "@coreui/icons";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [curatedFoodType, setCuratedFoodType] = useState([]);
  const [topInCity, setTopInCity] = useState([]);
  const [cityRestro, setCityRestro] = useState([]);
  const [curatedFoodType_Cards, setCuratedFoodType_Cards] = useState([]);
  const [topInCityRestro_Cards, setTopInCityRestro_Cards] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const RestroCardPromoted = withPromotedLabel(RestroCard);

  // Function to toggle visibility
  const showComponent = () => {
    setIsVisible(true); // Set to true
  };

  const hideComponent = () => {
    setIsVisible(false); // Set to false
  };

  useEffect(() => {
    if (searchTerm === "") {
      fetchData(); // Fetch all data when searchTerm is empty
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const data = await fetch(SWADSEVA_API_URL);
      // console.log(SWADSEVA_API_URL);
      // Check if the response is OK (status 200-299)
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();
      const cards = json.data.cards;

      // Continue processing the cards data here
      // console.log(cards);

      // Variables to hold the found data
      let curatedFoodType = null;
      let topInCity = null;
      let cityRestro = null;
      let curatedFoodType_Cards = null;
      let topInCityRestro_Cards = null;
      let listOfRestaurants = null;
      let filteredRestaurants = null;

      // Iterate through cards array to find restaurants, curatedFoodType, topInCity, and cityRestro
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]?.card?.card;

        // Set listOfRestaurants and filteredRestaurants
        if (!listOfRestaurants && card?.id == "restaurant_grid_listing") {
          listOfRestaurants = card.gridElements.infoWithStyle.restaurants;
          filteredRestaurants = card.gridElements.infoWithStyle.restaurants;
        }

        // Set curatedFoodType from the first valid card (with gridElements)
        if (!curatedFoodType && card?.id == "whats_on_your_mind") {
          curatedFoodType = card;
          curatedFoodType_Cards = card.gridElements.infoWithStyle.info;
        }

        // Set topInCity and topInCityRestro_Cards
        if (!topInCity && card?.id == "top_brands_for_you") {
          topInCity = card;
          topInCityRestro_Cards = card.gridElements?.infoWithStyle?.restaurants;
        }

        // Set cityRestro
        // if (!cityRestro) {
        //   cityRestro = card;
        // }

        if (!cityRestro && card.id == "popular_restaurants_title") {
          cityRestro = card.title;
        }

        // If all needed data is found, break the loop
        if (listOfRestaurants && curatedFoodType && topInCity && cityRestro) {
          break;
        }
      }

      // Set state for listOfRestaurants and filteredRestaurants
      if (listOfRestaurants) {
        setListofRestaurants(listOfRestaurants);
        setFilteredRestaurants(filteredRestaurants);
      }

      // Set state for curatedFoodType and its cards
      if (curatedFoodType) {
        setCuratedFoodType(curatedFoodType);
        setCuratedFoodType_Cards(curatedFoodType_Cards);
      }

      // Set state for topInCity and its restaurants
      if (topInCity) {
        setTopInCity(topInCity);
        setTopInCityRestro_Cards(topInCityRestro_Cards);
      }

      // Set state for cityRestro
      if (cityRestro) {
        setCityRestro(cityRestro);
      }

      // Log the data for debugging
      // console.log("Curated Food Type:", curatedFoodType);
      // console.log("Top in City:", topInCity);
      // console.log("Top in City - Cards:", topInCityRestro_Cards);
      // console.log("List of Restaurants:", listOfRestaurants);
      // console.log("City Restro:", cityRestro);
    } catch (error) {
      // Log or display the error
      console.error("Error fetching or processing data:", error.message);
    }
  };

  //search-bar
  // console.log("Search Rendered");
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value !== "") {
      const filteredList = listofRestaurants.filter((res) =>
        res?.info?.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRestaurants(filteredList);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Search Term:", searchTerm);
  };

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  const scrollContainerRef = useRef(null); // Reference to the scrollable container
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Adjust scroll amount as needed

      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="body mx-auto max-w-full sm:max-w-[80%] px-4">
      <main>
        <div className="filter flex flex-col sm:flex-row items-center">
          {/* Search Bar */}
          <div className="search mt-4 text-center w-full sm:w-auto m-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center"
            >
              <input
                className="w-full sm:w-[25rem] pl-3 py-2 border border-solid border-black focus:border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                type="text"
                placeholder="Search restaurant"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm.length !== 0 && (
                <button
                  className={`px-2 py-2 text-orange-500 rounded-r-l focus:outline-none ${
                    !searchTerm ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  onClick={clearSearchInput}
                  disabled={!searchTerm}
                >
                  <CIcon
                    className="text-black hover:text-orange-500 w-[1.5rem] mr-2"
                    icon={cilXCircle}
                  />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Curated Food Type Section */}
        <div className="curatedFoodtype-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 && searchTerm.length === 0 ? (
            <CuratedFoodTypeShimmer />
          ) : (
            isVisible &&
            searchTerm.length === 0 && (
              <div className=" py-4 overflow-hidden w-full">
                <div className="titleDiv">
                  <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                    {curatedFoodType.header?.title}
                  </h2>
                </div>
                <div className="relative w-full">
                  {/* Scrollable container */}
                  <div
                    className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory relative"
                    ref={scrollContainerRef}
                  >
                    {curatedFoodType_Cards.map((curated) => (
                      <div key={curated.id}>
                        <CuratedFoodType curatedData={curated} />
                      </div>
                    ))}
                  </div>
                  {/* Scroll Arrows */}
                  <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
                    onClick={() => scroll("left")}
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
                    onClick={() => scroll("right")}
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {isVisible && searchTerm.length === 0 ? (
          <div className="relative my-4">
            <div className="absolute inset-0 top-1/2 mx-auto max-w-screen-lg">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
            </div>
          </div>
        ) : null}

        {/* Top in City Section */}
        <div className="TopInCity-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 && searchTerm.length === 0 ? (
            <Shimmer />
          ) : (
            isVisible &&
            searchTerm.length === 0 && (
              <div className="py-4 overflow-hidden w-full">
                <div className="titleDiv py-4">
                  <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                    {topInCity.header?.title}
                  </h2>
                </div>
                <div className="relative w-full">
                  {/* Left Scroll Arrow */}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                    <button
                      onClick={() => {
                        document.querySelector(
                          ".scroll-container"
                        ).scrollLeft -= 200;
                      }}
                      className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* Right Scroll Arrow */}

                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                    <button
                      onClick={() => {
                        document.querySelector(
                          ".scroll-container"
                        ).scrollLeft += 200;
                      }}
                      className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex w-full overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory scroll-container">
                    {searchTerm.length === 0 &&
                      topInCityRestro_Cards.map((topInCity) => (
                        <div
                          className="p-0 w-full sm:w-[15rem] flex-shrink-0"
                          key={topInCity.id}
                        >
                          <RestroCard resData={topInCity} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {isVisible && searchTerm.length === 0 ? (
          <div className="relative my-4">
            <div className="absolute inset-0 top-1/2 mx-[calc(10%+52px)]">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
            </div>
          </div>
        ) : null}
        {/* Restaurant Section */}
        <div className="restaurant-container">
          <div className="py-4 overflow-hidden w-full">
            <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
              {cityRestro}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center w-full">
            {listofRestaurants.length === 0 ? (
              ""
            ) : filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) =>
                restaurant.info.avgRating > 4.4 ? (
                  <RestroCardPromoted
                    resData={restaurant}
                    key={restaurant.info.id}
                  />
                ) : (
                  <RestroCard resData={restaurant} key={restaurant.info.id} />
                )
              )
            ) : (
              <div className="flex justify-start self-start mr-auto pl-[2rem]">
                <h1 className="font-semibold text-lg text-left flex">
                  No results found
                </h1>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;
