import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utlis/useOnlineStatus";
const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  
  const [textSearch, setTextSearch] = useState([]);
  const [filterRestaurents,setfilterRestaurents] = useState([]);


  console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
   fetchData();
   },[]);

   const fetchData = async () =>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json  = await data.json();

  setlistOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setfilterRestaurents(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) {
    return <h1>
      Looks like you're offline!! Please check your internet connection 
    </h1>
  }

    return listOfRestaurants.length === 0 ? (<Shimmer/>) : (
      <div className='body'>
        <div className='filter flex'>
          <div className="search p-4 m-4"> 
          <input
          type="text" 
          className="border border-solid border-black"
          value = {textSearch}
          onChange={(e) => { setTextSearch(e.target.value);
          }}
          />
          <button className="px-4 py-1 bg-green-100 m-4 rounded-sm"
          onClick={() => {

          const filteredRestaurants = listOfRestaurants.filter
          ((res) => res.info.name.toLowerCase().includes(textSearch.toLowerCase())
          );

          setfilterRestaurents(filteredRestaurants);

          }}
          >
            Search
            </button>
          </div> 

            <div className="search p-4 m-4 flex items-center">
                <button className=" px-2 py-1 bg-green-100 rounded-sm"  
                onClick={()=>{
                const filterdList = listOfRestaurants.filter(res => res.info.avgRating > 4 
              );
                setlistOfRestaurants(filterdList);
               }}
               >
                Top Rated Restaurants
                </button>

             </div>                                 
          
        </div>
        <div className='flex flex-wrap justify-center'>
          {filterRestaurents.map((restaurant)=>(
          <Link className="m-1.5" key={restaurant.info.id} to = {"/restaurant/" + restaurant.info.id}><RestaurantCard resData = {restaurant}/></Link>
         )
          )
        }
          
        </div>
      </div>

    


    )
  }

  export default Body;