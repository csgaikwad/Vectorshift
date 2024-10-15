// llmNode.js

import React from "react";
import BaseNode from "../components/BaseNode";
import { Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  const handles = [
    { id: `${id}-system`, type: "target", position: Position.Left, style: { top: `${100 / 3}%` } },
    { id: `${id}-prompt`, type: "target", position: Position.Left, style: { top: `${200 / 3}%` } },
    { id: `${id}-response`, type: "source", position: Position.Right },
  ];

  return (
    <BaseNode label="LLM" handles={handles}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
