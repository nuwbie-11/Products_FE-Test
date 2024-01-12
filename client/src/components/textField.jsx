import React from "react";

const MyTextField = (props) => {
  return (
    <div className="flex flex-col gap-y-1 w-full" >
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type ?? "text"}
        name={props.name}
        id={props.name}
        className="border border-sky-500 rounded w-3/5 mb-3"
        required
      />
    </div>
  );
};

export default MyTextField;
