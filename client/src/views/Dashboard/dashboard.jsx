import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../../components/sidebar";
import Clock from "../../components/clock";
import { useActiveUserContext } from "../../context/userContext";
import LoadingCircular from "../../components/loader";
import ItemCards from "../../components/itemCard";
import Modal from "../../components/modal";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { activeUserId, setActiveUserId } = useActiveUserContext();
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      const res = await fetch("/protected", {
        credentials: "include",
      });
      if (!res.ok) {
        navigate("/");
      }
      const body = await res.json();
      // console.log(body);
      setActiveUserId(body["uid"]);
      setLoading(false);
    };

    const getProfile = async () => {
      console.log(activeUserId);
      const res = await fetch("/getProfile", {
        method: "POST",
        body: JSON.stringify({ userId: activeUserId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // if (res.status === 200) {
      //   const reponses = await res.json();
      //   // console.log(reponses);
      // }
    };

    const getProducts = async () => {
      const res = await fetch("/getProducts");
      if (res.status === 200) {
        res.json().then((value) => {
          console.log(value["response"]);
          setProducts(value["response"]);
        });
      }
    };

    isLoggedIn();
    if (activeUserId !== undefined) {
      getProfile();
    }
    getProducts();
  }, [activeUserId]);



  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <>
          <div className="pl-[16rem] pt-12 min-h-screen flex flex-col gap-y-5">
            <div className="header-items flex gap-x-8">
              <Clock></Clock>
            </div>
          <Modal>
            <p>Add Product</p>
          </Modal>
            
            {products != null ? (
              <div className="flex flex-wrap gap-x-8 gap-y-5">
                {products.map((item, key) => (
                  <ItemCards key={key} products={item}></ItemCards>
                ))}
              </div>
            ) : (
              <p>Tunggu</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
