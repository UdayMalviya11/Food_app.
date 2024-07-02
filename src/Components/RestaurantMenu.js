import { useState } from "react"; 
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utlis/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";


const RestaurantMenu = () => {

   const {resId} = useParams();
   const resInfo = useRestaurantMenu(resId);
   const [showIndex,setShowIndex] = useState(null);
   

  
   if(resInfo === null) return <Shimmer/> ;

const {name,costForTwoMessage,cuisines} = resInfo?.cards[2]?.card?.card?.info;
    
const { cards } = resInfo || {};
const itemCards = cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

const categories = 
    cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => 
        c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"      
    );


    
    return  (
        <div className="text-center">
    <h2 className="font-bold my-5 text-2xl">{name}</h2>
    <p className="font-semibold text-lg">{cuisines.join(", ")}-{costForTwoMessage}</p>
    {/** catagories accordions */}
    {categories.map((category,index) => (
        //Controlled Components
      <RestaurantCategory 
      key={category?.card?.card?.title}
      data={category?.card?.card}
      showItems={index === showIndex ? true : false}
      setShowIndex = {() => setShowIndex(index)}
      />
    ))}
</div>

    )
}
export default RestaurantMenu;