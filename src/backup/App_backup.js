import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/joy";

import Edit from "./Edit";
import Preview from "./Preview_backup";

function App() {
  const options = {
    fontWeight: "400",
    fontSize: "16px",
    color: "#000",
  };

  const [content, setContent] = useState("하이");

  const [styles, setStyels] = useState(options);
  console.log(styles);

  return (
    <Box sx={{ display: "flex", height: "100vh", boxSizing: "border-box" }}>
      <Edit styles={styles} setStyels={setStyels} />
      <Preview content={content} styles={styles} />
    </Box>
  );
}

export default App;
