import React from "react";

function Preview({ text, setText, style }) {
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
      <h3>텍스트 미리보기</h3>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          width: "100%",
          height: "150px",
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          textAlign: style.textAlign,
          padding: "10px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default Preview;
