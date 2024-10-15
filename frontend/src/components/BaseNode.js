// BaseNode.js

import React from "react";
import { Handle } from "reactflow";

const BaseNode = ({ label, children, handles }) => {
  return (
    <div className="node ">
      <div>
        <span className="nodeTitle">{label}</span>
      </div>
      <div className="childComponentWrapper px-2 ">{children}</div>
      {handles &&
        handles.map((handle) => (
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={{
              ...handle.style,
              background: "white",
              border: "2.5px solid violet",
              width: 12,
              height: 12,
            }}
          />
        ))}
    </div>
  );
};

export default BaseNode;
