import { useEffect, useState } from "react";

const useIsLoggedIn = (url) => {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL + url}`,{
      credentials:'include'
    })
      .then((res) => res.json())
      .then((data) => setActiveUser(data));
  }, [url]);

  function handleChanges(newState) {
    setActiveUser(newState);
  }
  return [activeUser, handleChanges];
};

export default useIsLoggedIn;
