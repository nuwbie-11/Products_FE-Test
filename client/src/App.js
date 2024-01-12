import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/dashboard";
import AuthPages from "./views/Auth/auth_page";
import NavigationBar from "./components/navbar";
import ActiveUserContextProvider from "./context/userContext";
import AddProducts from "./views/Products/addProduct";
import SideBar from "./components/sidebar";
import ProductDetails from "./views/Products/details";


const routes = [
  {
    path:"/",
    pages:<AuthPages/>,
    isAuth:true,
  },
  {
    path:"/dashboard",
    pages:<Dashboard/>,
    isAuth:false,
  },
  {
    path:"/addProduct",
    pages:<AddProducts/>,
    isAuth:false,
  },
  {
    path:"/details/:id",
    pages:<ProductDetails/>,
    isAuth:false,
  },
]

function App() {
  return (
    <div className="bg-zinc-100 text-zinc-950">

        <Routes>
          {
            routes.map((route, index) => 
              route.isAuth ? 
              <Route key={index} path={route.path} element={route.pages}></Route>
              : <Route key={index} path={route.path} element={
                <ActiveUserContextProvider>
                  <SideBar/>
                  <div className="pl-[12rem] pr-5 pb-8 md:pl-[16rem] pt-12 min-h-screen flex flex-col gap-y-5">
                    {route.pages}
                  </div>
              </ActiveUserContextProvider>
              }></Route>
             )
          }
          
        </Routes>



    </div>
  );
}

export default App;
