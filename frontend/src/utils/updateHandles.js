// updateHandles.js

const updateHandles = (text, id) => {
  const variablePattern = /\{\{\s*(\w+)\s*\}\}/g;
  const newHandles = [
    { id: `${id}-output`, type: "source", position: "right" },
  ];
  let match;
  let index = 1;

  while ((match = variablePattern.exec(text)) !== null) {
    newHandles.push({
      id: `${id}-${match[1]}-${index}`,
      type: "target",
      position: "left",
      style: { top: index * 30 + 10 },
    });
    index++;
  }

  return newHandles;
};

export default updateHandles;
