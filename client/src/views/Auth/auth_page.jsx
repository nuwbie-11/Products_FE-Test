import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPages = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      const res = await fetch("/protected", {
        credentials: "include",
      });
      if (!res.ok) {
        navigate("/");
      }
    };
    isLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const dataStream = {
      uname: formData.get("uname"),
      passwd: formData.get("passwd"),
    };
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(dataStream),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // const message = await response.json();
        throw new Error("Failed to Login");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="auth-wrapper w-2/5 h-[30rem] bg-white rounded-xl shadow shadow-black/30 backdrop-blur flex flex-col items-center gap-y-5">
        <div className="brand pt-12 pb-3">
          <h3 className="text-lg font-semibold text-center">SIGT</h3>
        </div>
        <hr className="w-full" />

        <div className="form-wrapper w-4/5">
          <form
            className="flex flex-col items-center gap-y-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              name="uname"
              id="uname"
              className="border border-sky-500 rounded w-4/5 mb-3"
              required
            />

            <label htmlFor="passwd">Password</label>
            <input
              type="password"
              name="passwd"
              id="passwd"
              className="border border-sky-500 rounded w-4/5 mb-3"
              required
            />

            <input
              type="submit"
              value={loading ? "Loading..." : "Masuk"}
              className={`px-8 py-2 rounded ${
                loading
                  ? "bg-zinc-200"
                  : "bg-sky-500 text-zinc-50  transition-all duration-150 hover:border hover:border-sky-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"
              } `}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default AuthPages;
