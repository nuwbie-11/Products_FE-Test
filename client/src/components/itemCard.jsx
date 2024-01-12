import React from "react";

const ItemCards = ({ products }) => {
  return (
    <div className="px-5 py-3 w-[20rem]  bg-white rounded shadow shadow-black/15 flex flex-col">
      <h3 className="text-center font-bold text-xl">
        {products["namaBarang"]}
      </h3>
      <p className="text-center font-light">
      {products["brand"]}
      </p>
    </div>
  );
};

export default ItemCards;
