import React from "react";
import { Editor } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const Preview = ({ editorState, setEditorState, customStyleMap }) => {
  return (
    <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
      <h3>텍스트 미리보기</h3>
      <Editor
        editorState={editorState}
        onChange={(newEditorState) => {
          setEditorState(newEditorState);
          const htmlContent = stateToHTML(newEditorState.getCurrentContent());
          console.log("현재 HTML 콘텐츠:", htmlContent);
        }}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};

export default Preview;
