import { useDispatch } from "react-redux";
import { addItems, removeItems, clearCart } from "../utlis/cartSlice";
import {CDN_URL} from "../utlis/contants";

const ItemList  = ({items}) => {
   const dispatch = useDispatch();

const handleAddItem = (item) => {
  dispatch(addItems(item));
}
const handleRemoveItem = (item) => {
  dispatch(removeItems(item));
}
const handleClearCart = (items) => {
  dispatch(clearCart(items));
}
return <div>
{items.map((item) => (
  <div key={item.card.info.id} 
  className="flex p-2 m-2 border-gray-200 border-b-2 my-1">
    <div className="flex-grow text-left my-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="font-semibold">
            {item.card.info.name}
          </div>
          <div className="text-sm font-medium text-gray-500">
            ₹{(item.card.info.defaultPrice ? item.card.info.defaultPrice : item.card.info.price) / 100}
          </div>
          <div className="text-xs text-gray-600">
            {item.card.info.description}
          </div>
          
        </div>
      </div>
    </div>

    <button className=" font-bold text-red-400 text-center rounded-lg shadow-lg hover:bg-gray-300 h-10  " onClick={() => handleRemoveItem(item)}>
    Remove</button> 
   <button onClick={() => handleClearCart(items)} >Clear Cart</button>
    <div className="ml-4 flex-shrink-0 relative">
  {item.card.info.imageId ? (
    <img 
      src={CDN_URL + item.card.info.imageId} 
      className="w-35 h-35 object-cover rounded-md" 
      alt={item.card.info.name} 
      style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
    />
  ) : null}
  <button className={`p-2 ${item.card.info.imageId ? 'my-8' : 'my-2'} bg-white font-bold text-green-400 text-center rounded-lg shadow-lg hover:bg-gray-300 w-20 h-9 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2`}
  onClick={() => handleAddItem(item)}>
    Add +
  </button>
  
  
</div>

  </div>
))}
</div>




}

export default ItemList;