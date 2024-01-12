import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard/dashboard";
import AuthPages from "./views/Auth/auth_page";
import NavigationBar from "./components/navbar";
import ActiveUserContextProvider from "./context/userContext";
import AddProducts from "./views/Products/addProduct";
import SideBar from "./components/sidebar";


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
                {route.pages}
              </ActiveUserContextProvider>
              }></Route>
             )
          }
          
        </Routes>



    </div>
  );
}

export default App;
