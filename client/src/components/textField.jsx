import React from "react";

const MyTextField = (props) => {
  return (
    <>
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type ?? "text"}
        name={props.name}
        id={props.name}
        defaultValue={props.value ?? ""}
        className="border border-sky-500 rounded w-full md:w-3/5 mb-3"
        required
      />
    </>
  );
};

export default MyTextField;
