// AutoResizingTextarea.js

import React, { useEffect, useRef } from "react";

const ResizingTextarea = ({ value, onChange, className, title }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <label>
      <span className="inputTitle">{title}:</span>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={className}
      />
    </label>
  );
};

export default ResizingTextarea;
