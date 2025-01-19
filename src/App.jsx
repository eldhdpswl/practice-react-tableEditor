import React, { useState } from "react";
import Edit from "./Edit";
import EditPreview from "./EditPreview";

const App = () => {
  const [selectedData, setSelectedData] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Edit setSelectedData={setSelectedData} />
      <EditPreview
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default App;
