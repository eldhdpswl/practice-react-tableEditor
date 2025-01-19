import React, { useState } from "react";
import { Box, Typography, Input } from "@mui/joy";

function Preview({ content, styles }) {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  return (
    <Box sx={{ width: "50%", padding: "16px", textAlign: "right" }}>
      <Typography level="h5" sx={{ marginBottom: "8px" }}>
        Preview
      </Typography>
      <Typography
        sx={{ fontWeight: styles.fontWeight, fontSize: styles.fontSize }}
      >
        {content}
      </Typography>
      <Input
        sx={{
          fontWeight: styles.fontWeight,
          fontSize: styles.fontSize,
          fontColor: styles.color,
        }}
        value={text}
        onChange={(e) => handleOnChange(e)}
      ></Input>
    </Box>
  );
}

export default Preview;
