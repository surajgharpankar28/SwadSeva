import React, { useContext } from "react";
import { useState, useEffect } from "react";
import RestroCard, { withPromotedLabel } from "./RestroCard";
import Shimmer from "./Shimmer";
import CuratedFoodType from "./CuratedFoodType";
import UserContext from "../utils/UserContext";
import { SWADSEVA_API_URL } from "../utils/constants";

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

  return (
    <div className="body mx-auto max-w-[80%] ">
      <main>
        <div className="filter flex items-center">
          <div className="search px-4">
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  className="pl-1 border borer-solid border-black rounded-lg"
                  type="text"
                  placeholder="search restaurant"
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
                    if (searchTerm) {
                      hideComponent();
                    }
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
                  (res) => res.info.avgRating > 4.3
                );
                hideComponent();
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
                showComponent();
                clearSearchInput();
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="m-4 p-4 flex items-center">
          <label>Username : </label>
          <input
            className="border border-black p-2 m-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="curatedFoodtype-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 ? (
            <Shimmer />
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

                  <div className="relative w-full ">
                    <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory">
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
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {isVisible ? (
          <hr className="border border-[rgba(2,6,12,0.10)] mx-[calc(10%+52px)] my-2" />
        ) : null}

        <div className="TopInCity-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 ? (
            <Shimmer />
          ) : (
            isVisible && (
              <>
                <div className="p-4 overflow-hidden">
                  <div className="titleDiv">
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
          <hr className="border border-[rgba(2,6,12,0.10)] mx-[calc(10%+52px)] my-2" />
        ) : null}

        <div className="restaurant-container">
          <div className="p-4 overflow-hidden">
            <div className="titleDiv">
              <div>
                <h2 className="title pl-4 pt-4 pb-1 font-bold text-2xl">
                  {cityRestro}
                </h2>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {listofRestaurants.length === 0 ? (
              <Shimmer />
            ) : (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;
