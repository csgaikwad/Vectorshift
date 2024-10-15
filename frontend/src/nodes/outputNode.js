// outputNode.js

import React, { useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";
import ResizingTextarea from "../components/ResizingTextArea";
import SelectorMenu from "../components/SelectorMenu";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    { id: `${id}-value`, type: "target", position: Position.Left },
  ];

  const options = [
    { value: "Text", title: "Text" },
    { value: "Image", title: "Image" },
  ];

  return (
    <BaseNode label="Output" handles={handles}>
      <div>
        <ResizingTextarea
          value={currName}
          onChange={handleNameChange}
          title={"Name"}
        />
        <SelectorMenu
          value={outputType}
          onChange={handleTypeChange}
          options={options}
        />
      </div>
    </BaseNode>
  );
};
