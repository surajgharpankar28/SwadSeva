import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import RestroCard, { withPromotedLabel } from "./RestroCard";
import Shimmer, { CuratedFoodTypeShimmer } from "./Shimmer";
import CuratedFoodType from "./CuratedFoodType";
import UserContext from "../utils/UserContext";
import { SWADSEVA_API_URL } from "../utils/constants";
import { CIcon } from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [curatedFoodType, setCuratedFoodType] = useState([]);
  const [topInCity, setTopInCity] = useState([]);
  const [cityRestro, setCityRestro] = useState([]);
  const [curatedFoodType_Cards, setCuratedFoodType_Cards] = useState([]);
  const [topInCityRestro_Cards, setTopInCityRestro_Cards] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const RestroCardPromoted = withPromotedLabel(RestroCard);

  // Function to toggle visibility
  const showComponent = () => {
    setIsVisible(true); // Set to true
  };

  const hideComponent = () => {
    setIsVisible(false); // Set to false
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(SWADSEVA_API_URL);
      console.log(SWADSEVA_API_URL);
      // Check if the response is OK (status 200-299)
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const json = await data.json();
      const cards = json.data.cards;

      // Continue processing the cards data here
      console.log(cards);

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
      console.log("Curated Food Type:", curatedFoodType);
      console.log("Top in City:", topInCity);
      console.log("Top in City - Cards:", topInCityRestro_Cards);
      console.log("List of Restaurants:", listOfRestaurants);
      console.log("City Restro:", cityRestro);
    } catch (error) {
      // Log or display the error
      console.error("Error fetching or processing data:", error.message);
    }
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

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  const { loggedInUser, setUserName } = useContext(UserContext);
  console.log(loggedInUser);

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
    <div className="body mx-auto max-w-[80%] ">
      <main>
        <div className="filter flex items-center">
          {/* Search Bar */}

          <div className="search px-4 mt-4 text-center m-auto">
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center"
              >
                <input
                  className="pl-3 py-2 border border-solid border-black focus:border-orange-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  type="text"
                  placeholder="Search restaurant"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button
                  className="px-2 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-400 focus:outline-none"
                  type="submit"
                  onClick={() => {
                    // Filter logic
                    const filteredList = listofRestaurants.filter((res) =>
                      res?.info?.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    );
                    console.log("Button Clicked");
                    setFilteredRestaurants(filteredList);
                    console.log(filteredList);
                    if (searchTerm) {
                      hideComponent();
                    }
                  }}
                >
                  <CIcon
                    className="text-white w-[1.5rem] mr-2"
                    icon={cilSearch}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="curatedFoodtype-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 ? (
            <CuratedFoodTypeShimmer />
          ) : (
            isVisible && (
              <>
                <div className="p-4 overflow-hidden">
                  <div className="titleDiv">
                    <div>
                      <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                        {curatedFoodType.header?.title}
                      </h2>
                      <div></div>
                    </div>
                  </div>

                  <div className="relative w-full">
                    {/* Scrollable container */}
                    <div
                      className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory relative"
                      ref={scrollContainerRef} // Set the reference to the scroll container
                    >
                      <div className="row flex">
                        {curatedFoodType_Cards.map((curated) => (
                          <div key={curated.id}>
                            <CuratedFoodType
                              curatedData={curated}
                              key={curated.imageGridCards?.info[0]?.id}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Left Arrow */}
                    <div
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
                      onClick={() => scroll("left")} // Scroll left when clicked
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>

                    {/* Right Arrow */}
                    <div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
                      onClick={() => scroll("right")} // Scroll right when clicked
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {isVisible ? (
          <div className="relative my-4">
            <div className="absolute inset-0 top-1/2 mx-[calc(10%+52px)]">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
            </div>
          </div>
        ) : null}

        <div className="TopInCity-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 ? (
            <Shimmer />
          ) : (
            isVisible && (
              <>
                <div className="p-4 overflow-hidden">
                  <div className="titleDiv py-4">
                    <div>
                      <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                        {topInCity.header?.title}
                      </h2>
                      <div></div>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory">
                      <div className="row flex">
                        {topInCityRestro_Cards.map((topInCity) => (
                          <div key={topInCity.id}>
                            <RestroCard
                              resData={topInCity}
                              key={topInCity.imageGridCards?.info[0]?.id}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {}
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {isVisible ? (
          <div className="relative my-4">
            <div className="absolute inset-0 top-1/2 mx-[calc(10%+52px)]">
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent shadow-xl"></div>
            </div>
          </div>
        ) : null}

        <div className="restaurant-container">
          <div className="p-4 overflow-hidden">
            <div className="titleDiv py-4">
              <div>
                <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                  {cityRestro}
                </h2>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {listofRestaurants.length === 0
              ? ""
              : filteredRestaurants.map((restaurant) =>
                  restaurant.info.avgRating > 4.4 ? (
                    <RestroCardPromoted
                      resData={restaurant}
                      key={restaurant.info.id}
                    />
                  ) : (
                    <RestroCard resData={restaurant} key={restaurant.info.id} />
                  )
                )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;
