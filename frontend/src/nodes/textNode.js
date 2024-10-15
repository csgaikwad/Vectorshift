// textNode.js

import React, { useLayoutEffect, useState } from "react";
import BaseNode from "../components/BaseNode";
import { Position, useUpdateNodeInternals } from "reactflow";
import ResizingTextarea from "../components/ResizingTextArea";
import updateHandles from "../utils/updateHandles";

export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([
    { id: `${id}-output`, type: "source", position: Position.Right },
  ]);

  const handleTextChange = (e) => {
    const { value } = e.target;
    setCurrText(value);
  };

  useLayoutEffect(() => {
    const newHandles = updateHandles(currText, id);
    setHandles(newHandles);
    updateNodeInternals(id);
  }, [currText, id, updateNodeInternals]);

  return (
    <BaseNode key={id} label="Text" handles={handles}>
      <ResizingTextarea
        value={currText}
        onChange={handleTextChange}
        title={"Text"}
      />
    </BaseNode>
  );
};
