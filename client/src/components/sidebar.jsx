import React from "react";
import { BsArrowRight, BsHouse, BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const navIcons = [<BsHouse />, <BsPlusCircle />, <BsArrowRight />];
const SideBar = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    const res = await fetch(`/logout`, {
      method: "POST",
    });
    if (res.status === 200) {
      navigate("/")
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
      <div className="w-[100dvw] md:h-[screen] fixed bg-white md:w-[14.5rem] shadow-lg shadow-black/40 md:top-0 bottom-0 sidebar-container">
        <nav className="flex md:flex-col w-full md:py-12 py-2 justify-center md:justify-start">
          <ul className="navItems flex  md:flex-col md:pt-12 gap-x-3 md:gap-y-3 px-1 md:px-3 font-semibold">
            {userMenus.map((items, key) => (
              <div
                key={key}
                className="flex flex-col md:flex-row items-center gap-x-3"
              >
                {navIcons[key]}
                <button onClick={items["func"]} className="hover:text-rose-800">
                  <p className="">{items.name}</p>
                </button>
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SideBar;
