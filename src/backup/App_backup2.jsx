import React, { useState } from "react";
// import TextEdit from "./TextEdit_backup2";
// import Preview from "./Preview_backup2";
import TextEdit from "./TextEdit_backup2";
import Preview from "./Preview_backup2";

function App() {
  const [text, setText] = useState("여기에 텍스트를 입력하세요.");
  const [style, setStyle] = useState({
    fontSize: "16px",
    fontWeight: "normal",
    textAlign: "left",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "20px",
      }}
    >
      <TextEdit text={text} style={style} setStyle={setStyle} />
      <Preview text={text} setText={setText} style={style} />
    </div>
  );
}

export default App;
