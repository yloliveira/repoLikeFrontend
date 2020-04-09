import React from "react";

export default function Checkbox({ title, onClick }) {
  return (
    <div>
      <input type="checkbox" id={title} name={title} onClick={onClick} />
      <label htmlFor={title}>{title}</label>
    </div>
  );
}
