// handleUtils.js

const updateHandles = (text, id) => {
    const variablePattern = /\{\{\s*(\w+)\s*\}\}/g;
    const newHandles = [
        { id: `${id}-output`, type: "source", position: "right" }, // Output handle
    ];

    let match;
    while ((match = variablePattern.exec(text)) !== null) {
        newHandles.push({
            id: `${id}-${match[1]}`,
            type: "target",
            position: "left",
        });
    }

    return newHandles;
};

export default updateHandles;
