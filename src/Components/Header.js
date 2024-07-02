import { useContext, useState } from "react";
import {LOGO_URL}  from "../utlis/contants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utlis/useOnlineStatus";
import UserContext from "../utlis/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnName,setbtnName] = useState("login");
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);

  //Subscribing to the store using Selector 
  const cardItems = useSelector((store) => store.cart.items);
  console.log(cardItems);
    return (
      <div className='flex justify-between bg-pink-100 shadow-lg'>
        <div className='logo-container' > 
        <img className="w-20"  
        src={LOGO_URL}/>
  
        </div>  
     <div className='flex item-center'>
        <ul className="flex p-4 m-3">
          
          <li className="px-3">
            Online Status: {onlineStatus?"✅" : "🔴"}
          </li>

          <li className="px-3">
            <Link to='/'>Home</Link>
          </li>

          <li className="px-3">
            <Link to='/contact'>Contact Us</Link>
          </li>
          
          <li className="px-3">
            <Link to='/grocery'> Grocery</Link>
          </li>
          
          <li className="px-3">
            <Link to='/about'>About Us</Link>
          </li>

          <li className="px-3 font-bold text-md">
            <Link to='/Cart'> Cart - ({cardItems.length} items)</Link>
          </li>
         
          <button className="login"
           onClick = {
           () => {  btnName === "login"? setbtnName("Logout"): setbtnName("login")

           }}>
            {btnName}
           </button>
           <li className="px-4 font-bold">{loggedInUser}</li> 
          
        </ul>
      </div> 
      
      </div>
     
    );
  };

  export default Header;