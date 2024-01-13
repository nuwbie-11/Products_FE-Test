import React from 'react'
import { BsArrowRight, BsHouse, BsPlusCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const navIcons = [<BsHouse />,<BsPlusCircle /> ,<BsArrowRight />];
const SideBar = () => {
    const navigate = useNavigate();
    const logOut = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
          method: "POST",
          credentials:'include',
        });
        if (res.status === 200) {
          window.location.reload();
        }
      };
    
      const userMenus = [
        {
          name: "Dashboard",
          func: () => navigate("/dashboard"),
        },
        {
          name: "Tambah Barang",
          func: () => navigate("/addProduct"),
        },
        {
          name: "Log Out",
          func: () => logOut(),
        },
      ];
  return (
    <header className="z-[999] relative">
        <div className="h-screen fixed bg-white md:w-[14.5rem] shadow-lg shadow-black/40 top-0 sidebar-container">
          <nav className="flex flex-col w-full py-12">
            <ul className="navItems flex flex-col pt-12 gap-y-3 px-3 font-semibold">
              {userMenus.map((items, key) => (
                <div key={key} className="flex items-center gap-x-3">
                    {navIcons[key]}
                    <button
                    onClick={items["func"]}
                    className="hover:text-rose-800"
                  >
                    {items.name}
                  </button>
                </div>
              ))}
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default SideBar