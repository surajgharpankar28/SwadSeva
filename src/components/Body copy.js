import React from "react";
import { useState, useEffect } from "react";
import RestroCard from "./RestroCard";
import Shimmer from "./Shimmer";
import CuratedFoodType from "./CuratedFoodType";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [curatedFoodType, setCuratedFoodType] = useState([]);
  const [topInCity, setTopInCity] = useState([]);

  const [cityRestro, setCityRestro] = useState([]);

  const [curatedFoodType_Cards, setCuratedFoodType_Cards] = useState([]);

  const [topInCityRestro_Cards, setTopInCityRestro_Cards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      // "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.7049873&lng=74.24325270000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const cards = json.data.cards;

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
      if (
        !listOfRestaurants &&
        card?.gridElements?.infoWithStyle?.restaurants
      ) {
        listOfRestaurants = card.gridElements.infoWithStyle.restaurants;
        filteredRestaurants = card.gridElements.infoWithStyle.restaurants;
      }

      // Set curatedFoodType from the first valid card (with gridElements)
      if (!curatedFoodType && card?.gridElements?.infoWithStyle?.info) {
        curatedFoodType = card;
        curatedFoodType_Cards = card.gridElements.infoWithStyle.info;
      }

      // Set topInCity and topInCityRestro_Cards
      if (!topInCity && card?.gridElements?.infoWithStyle?.restaurants) {
        topInCity = card;
        topInCityRestro_Cards = card?.gridElements?.infoWithStyle?.restaurants;
      }

      // Set cityRestro (this assumes it follows a similar pattern)
      if (!cityRestro) {
        cityRestro = card;
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
    console.log("List of Restaurants:", listOfRestaurants);
    console.log("Curated Food Type:", curatedFoodType);
    console.log("Top in City:", topInCity);
    console.log("Top in City - Cards:", topInCityRestro_Cards);
    console.log("City Restro:", cityRestro);

    //curatedFoodType_Cards = curatedFoodType.gridElements?.infoWithStyle?.info;
    //topInCityRestro_Cards = json.data.cards[1].card?.card.gridElements?.infoWithStyle?.restaurants;
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
      <main>
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

        <div className="curatedFoodtype-container flex flex-wrap justify-center">
          {curatedFoodType.length === 0 ? (
            <div>No Curated</div>
          ) : (
            <>
              <div className="p-4 overflow-hidden">
                <div className="titleDiv">
                  <div>
                    <h2 className="title pl-4 pt-4 pb-1 font-bold text-xl">
                      {curatedFoodType.header?.title}
                    </h2>
                    <div></div>
                  </div>
                </div>
                <div className="relative w-full">
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

                  {}
                </div>
              </div>
            </>
          )}
        </div>

        <hr className="border border-[rgba(2,6,12,0.10)] mx-[calc(10%+52px)] my-8"></hr>

        <div className="TopInCity-container flex flex-wrap justify-center">
          {topInCity.length === 0 ? (
            <div>No Top in City</div>
          ) : (
            <>
              <div className="p-4 overflow-hidden">
                <div className="titleDiv">
                  <div>
                    <h2 className="title pl-4 pt-4 pb-1 font-bold text-xl">
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
          )}
        </div>

        <hr className="border border-[rgba(2,6,12,0.10)] mx-[calc(10%+52px)] my-8"></hr>

        <div className="restaurant-container">
          <div className="p-4 overflow-hidden">
            <div className="titleDiv">
              <div>
                <h2 className="title pl-4 pt-4 pb-1 font-bold text-xl">
                  {cityRestro.title}
                </h2>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {listofRestaurants.length === 0 ? (
              <Shimmer />
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestroCard resData={restaurant} key={restaurant.info.id} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Body;
