import React from "react";

const SelectorMenu = ({ className, value, onChange, options }) => {
  return (
    <label>
      <span className="inputTitle">Type:</span>
      <select
        className={className}
        value={value}
        onChange={onChange}
      >
        {options &&
          options.map((option,index) => (
            <option key={index} value={option.value}> {option.title}</option>
          ))}
      </select>
    </label>
  );
};

export default SelectorMenu;
