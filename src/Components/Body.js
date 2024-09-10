import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utlis/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch the restaurant data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.71700&lng=75.83370&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();

    const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  const onlineStatus = useOnlineStatus();

  // If the user is offline
  if (!onlineStatus) {
    return <h1>Looks like you're offline! Please check your internet connection.</h1>;
  }

  // Handle search
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  // Handle filtering top-rated restaurants
  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter((restaurant) => restaurant.info.avgRating > 4);
    setFilteredRestaurants(filtered);
  };

  // Show shimmer if data is still loading
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      {/* Filter Section */}
      <div className="filter flex">
        {/* Search Input */}
        <div className="search p-4 m-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="px-4 py-1 bg-green-100 m-4 rounded-sm" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Top Rated Button */}
        <div className="search p-4 m-4 flex items-center">
          <button className="px-2 py-1 bg-green-100 rounded-sm" onClick={handleTopRated}>
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {/* Restaurant List Section */}
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map((restaurant) => (
          <Link className="m-1.5" key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
