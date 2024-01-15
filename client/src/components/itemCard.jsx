import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCards = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/details/" + products.id)}
      className="px-5 py-3 w-[18rem] xs:w-[20rem] bg-white rounded shadow shadow-black/15 flex flex-col hover:scale-110 transition-all ease-in"
    >
      <h3 className="text-center font-bold text-xl hover:cursor-default">
        {products["namaBarang"]}
      </h3>
      <p className="text-center font-light hover:cursor-default">
        {products["brand"]}
      </p>
    </div>
  );
};

export default ItemCards;
