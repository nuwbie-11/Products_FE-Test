import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Clock from "../../components/clock";
import { useActiveUserContext } from "../../context/userContext";
import LoadingCircular from "../../components/loader";
import ItemCards from "../../components/itemCard";
import useFetch from "../../hooks/useFetch";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

function Dashboard() {
  const navigate = useNavigate();
  const { activeUserId, setActiveUserId } = useActiveUserContext();
  const [products] = useFetch("/getProducts");
  const [uid] = useIsLoggedIn("/protected");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (uid !== undefined) {
      if (uid.hasOwnProperty('uid')) {
        if (activeUserId === undefined) {
          setActiveUserId(uid);
        }
        setLoading(false);
      
      }else{
        navigate('/')
      }
    }
  }, [uid]);

  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <>
          <div className="header-items flex gap-x-8">
            <Clock></Clock>
          </div>

          {products != null ? (
            <div className="flex flex-wrap justify-center items-center md:justify-start md:items-start gap-x-8 gap-y-5">
              {products.map((item, key) => (
                <ItemCards key={key} products={item}></ItemCards>
              ))}
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Dashboard;
