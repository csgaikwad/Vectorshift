// textNode.js

import React, { useEffect, useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";
import ResizingTextarea from "../components/ResizingTextArea";
import updateHandles from "../utils/updateHandles";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([
    { id: `${id}-output`, type: "source", position: Position.Right },
  ]);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setCurrText(value);
  };

  // Initial handle update for default text
   useEffect(() => {
        const newHandles = updateHandles(currText, id);
        setHandles(newHandles);
    }, [currText, id]);

  return (
    <BaseNode label="Text" handles={handles}>
      <ResizingTextarea
        value={currText}
        onChange={handleTextChange}
        title={"Text"}
      />
    </BaseNode>
  );
};
