import React from "react";

const dataList = [
  {
    id: 1,
    content: `I.보험종류\n<table><tr><td>보험종목의 명칭</td><td>환급금 형태</td></tr><tr><td>KB toss착한암보험 무배당</td><td>표준형</td></tr><tr><td>KB toss착한암보험 무배당(해약환급금 미지급형)</td><td>해약환급금 미지급형</td></tr></table>`,
  },
  {
    id: 2,
    content:
      "<table><tr><td>경과기간</td><td>납입보험료(A)</td><td>해약환급금(B)</td><td>환급률(B/A)</td><td>납입보험료(A)</td><td>해약환급금(B)</td><td>환급률(B/A)</td></tr><tr><td>3월</td><td>94,140</td><td>0</td><td>0.00%</td><td>56,250</td><td>0</td><td>0.00%</td></tr><tr><td>6월</td><td>188,280</td><td>0</td><td>0.00%</td><td>112,500</td><td>0</td><td>0.00%</td></tr></table>",
  },
];

const Edit = ({ setSelectedData }) => {
  const handleClick = (content) => {
    setSelectedData(content);
  };

  return (
    <div
      style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}
    >
      <h3>데이터 리스트</h3>
      <ul>
        {dataList.map((data) => (
          <li
            key={data.id}
            style={{ cursor: "pointer", marginBottom: "10px" }}
            onClick={() => handleClick(data.content)}
          >
            데이터 {data.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Edit;
