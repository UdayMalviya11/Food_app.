import React, { lazy, Suspense } from 'react';
import  { useEffect } from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom/client'
import Header from './Components/Header';
import Body from './Components/Body';
import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Components/Error';


import RestaurantMenu from './Components/RestaurantMenu';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import UserContext from './utlis/UserContext';


import { Provider } from 'react-redux';
import appStore from './utlis/appStore';
import Cart from './Components/Cart';

const Grocery = lazy(() => import("./Components/Grocery")); 

const Applayout = () => {

const [userName, setUserName] = useState();

useEffect(() => {
  const data = {
    name: "Uday Malviya",
  };
  setUserName(data.name);
},[]);

  return (
    //We wraped whole app to our store
    <Provider store= {appStore}>
    <UserContext.Provider value={{loggedInUser : userName}}>
    <div className="app">
    <Header/>
    <Outlet/>
    </div> 
    </UserContext.Provider>
    </Provider>
    
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout/>,
    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
        
      },
      {
      path: "/grocery",
      element: (<Suspense fallback= {<h1>Loading...</h1>}>
        <Grocery/>
        </Suspense>
        ),
      },
      {
        path: "/Cart",
        element: <Cart/>
      },
      {
        path:"/restaurant/:resId",
        element: <RestaurantMenu/>, 
      },
    ],
    errorElement: <Error/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);
