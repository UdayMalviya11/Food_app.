import { CDN_URL } from "../utlis/contants";
const RestaurantCard = (props) => {
    const {resData} = props;
    const {cloudinaryImageId, name, avgRating, costForTwo, sla, cuisines} = resData?.info;
    return (
      <div className="m-4 p-4 w-[240px] overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200">
  <div className="imgID">
    <img
      className="rounded-lg w-full h-32 object-cover"
      alt="res-logo"
      src={CDN_URL + cloudinaryImageId}
    />
  </div>
  <div className="space-y-2">
    
    <h4 className="text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis ">{name}</h4>
    <h4 className="whitespace-nowrap overflow-hidden overflow-ellipsis">{cuisines.join(", ")}</h4>
    <div className="flex items-center justify-between">
      <h4 className="stars text-yellow-500">{avgRating}⭐</h4>
      <h4 className="delivery-time text-gray-500">{sla.slaString}</h4>
    </div>
    <h3 className="text-gray-700">{costForTwo}</h3>
  </div>   
</div>

    )
  }
  export default RestaurantCard;