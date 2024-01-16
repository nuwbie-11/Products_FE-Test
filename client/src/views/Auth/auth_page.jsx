import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import LoadingCircular from "../../components/loader";
import MyTextField from "../../components/textField";

const AuthPages = () => {
  const [uid] = useIsLoggedIn(`/protected`);
  const [isLoading, setLoading] = useState(true);

  const [loadingButton, setLoadingButton] = React.useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // Listen for the UID Changes
  useEffect(() => {
    if (uid !== undefined) {
        // check whether uid has property of uid itself
        // Key 'uid' indicates user is authorized
      if (uid.hasOwnProperty('uid')) {
        navigate('/dashboard')
        
      }else{
        // UID would never undefined after fetching from useIsLogged In
        // After done fetching setLoading to false
        setLoading(false);
      }
    }
  }, [uid]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const dataStream = {
      uname: formData.get("uname"),
      passwd: formData.get("passwd"),
    };
    try {
      const response = await fetch(`/login`, {
        method: "POST",
        body: JSON.stringify(dataStream),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (!response.ok) {
        const body = await response.json();
        setMessage(body["message"]);
        throw new Error("Failed to Login");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <main className="flex min-h-screen flex-col items-center md:justify-between justify-center md:p-24 p-5">
          <div className="auth-wrapper md:w-2/5 w-full h-[30rem] bg-white rounded-xl shadow shadow-black/30 backdrop-blur flex flex-col items-center gap-y-5">
            <div className="brand pt-12 pb-3">
              <h3 className="text-lg font-semibold text-center">SIGT</h3>
            </div>
            <hr className="w-full" />

            <div className="form-wrapper w-4/5">
              <form
                className="flex flex-col items-center justify-center gap-y-2"
                onSubmit={handleSubmit}
              >
                {/* <MyTextField name="namaBarang" title="Nama Barang" /> */}
                <MyTextField name="uname" title="Username" />

                <MyTextField name="passwd" title="Password" type="password" />

                <input
                  type="submit"
                  value={loadingButton ? "Loading..." : "Masuk"}
                  className={`px-8 py-2 rounded ${
                    loadingButton
                      ? "bg-zinc-200"
                      : "bg-sky-500 text-zinc-50  transition-all duration-150 hover:border hover:border-sky-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"
                  } `}
                  disabled={loadingButton}
                />
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AuthPages;
