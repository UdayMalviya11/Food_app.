import { useState } from "react"; 
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utlis/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  // Show shimmer if data is still loading
  if (!resInfo) return <Shimmer />;

  // Destructure restaurant info
  const { name, costForTwoMessage, cuisines } = resInfo?.cards[2]?.card?.card?.info || {};

  // Extracting categories from the restaurant data
  const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
    (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  ) || [];

  return (
    <div className="text-center">
      {/* Restaurant details */}
      <h2 className="font-bold my-5 text-2xl">{name}</h2>
      <p className="font-semibold text-lg">{cuisines?.join(", ")} - {costForTwoMessage}</p>
      
      {/* Categories Accordion */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
