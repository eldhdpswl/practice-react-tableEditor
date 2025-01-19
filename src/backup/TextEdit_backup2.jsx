import React from "react";

function TextEdit({ text, style, setStyle }) {
  const handleStyleChange = (key, value) => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      [key]: value,
    }));
  };

  return (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}>
      <h3>텍스트 스타일 편집</h3>
      <div>
        <label>
          크기:
          <input
            type="number"
            value={parseInt(style.fontSize, 10)}
            onChange={(e) =>
              handleStyleChange("fontSize", `${e.target.value}px`)
            }
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </label>
      </div>
      <div>
        <label>
          굵기:
          <select
            value={style.fontWeight}
            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            <option value="normal">일반</option>
            <option value="bold">굵게</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          정렬:
          <select
            value={style.textAlign}
            onChange={(e) => handleStyleChange("textAlign", e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            <option value="left">왼쪽</option>
            <option value="center">가운데</option>
            <option value="right">오른쪽</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default TextEdit;
