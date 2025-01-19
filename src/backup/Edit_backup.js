import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/joy";

function Edit({ styles, setStyels }) {
  console.log(styles);

  const handleClick1 = () => {
    console.log("1");
    setStyels((prevStyles) => ({
      ...prevStyles,
      fontWeight: "bold", // Example of updating fontWeight
    }));
  };
  const handleClick2 = () => {
    console.log("1");
    setStyels((prevStyles) => ({
      ...prevStyles,
      fontSize: "50px", // Example of updating fontWeight
    }));
  };
  const handleClick3 = () => {
    console.log("");
    setStyels((prevStyles) => ({
      ...prevStyles,
      color: "blue",
    }));
  };

  const applyTextStyle = () => {};

  return (
    // <Box sx={{ width: "50%", padding: "16px", textAlign: "left" }}>
    //   <Typography level="h5" sx={{ marginBottom: "8px" }}>
    //     Edit
    //   </Typography>
    //   <Button onClick={handleClick1}>폰트웨이트</Button>
    //   <Button onClick={handleClick2}>폰트사이즈</Button>
    //   <Button onClick={handleClick3}>폰트색깔</Button>
    // </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        border: "1px solid #ccc",
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        borderRadius: "8px",
      }}
    >
      {/* 스타일링 버튼 */}
      <Button onClick={() => applyTextStyle("bold")}>B</Button>
      <Button onClick={() => applyTextStyle("italic")}>
        <em>I</em>
      </Button>
      <Button onClick={() => applyTextStyle("underline")}>
        <u>U</u>
      </Button>

      {/* 폰트 크기 조절 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Typography>크기:</Typography>
        <select
          onChange={(e) => applyTextStyle("fontSize", e.target.value)}
          defaultValue="3"
        >
          <option value="1">1 (작음)</option>
          <option value="2">2</option>
          <option value="3">3 (기본)</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7 (크게)</option>
        </select>
      </Box>

      {/* 폰트 색상 변경 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Typography>색상:</Typography>
        <input
          type="color"
          onChange={(e) => applyTextStyle("foreColor", e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Edit;
