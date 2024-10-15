// inputNode.js

import React, { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";
import ResizingTextarea from "../components/ResizingTextArea";
import SelectorMenu from "../components/SelectorMenu";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { id: `${id}-value`, type: "source", position: Position.Right },
  ];

  const options = [
    { value: "Text", title: "Text" },
    { value: "File", title: "File" },
  ];

  return (
    <BaseNode label="Input" handles={handles}>
      <div>
        <ResizingTextarea
          value={currName}
          onChange={handleNameChange}
          title={"Name"}
        />
        <SelectorMenu
          value={inputType}
          onChange={handleTypeChange}
          options={options}
        />
      </div>
    </BaseNode>
  );
};
