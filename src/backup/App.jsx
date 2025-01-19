import React, { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEdit from "./TextEdit";
import Preview from "./Preview";

const customStyleMap = {
  FONTSIZE_12px: { fontSize: "12px" },
  FONTSIZE_14px: { fontSize: "14px" },
  FONTSIZE_16px: { fontSize: "16px" },
  FONTSIZE_18px: { fontSize: "18px" },
  FONTSIZE_20px: { fontSize: "20px" },
};

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleStyle = (style) => {
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    } else {
      const contentState = editorState.getCurrentContent();
      const newContentState = Modifier.applyInlineStyle(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: contentState.getPlainText().length,
        }),
        style
      );
      setEditorState(
        EditorState.push(editorState, newContentState, "change-inline-style")
      );
    }
  };

  // const handleFontSize = (fontSize) => {
  //   const selection = editorState.getSelection();
  //   const contentState = editorState.getCurrentContent();
  //   const newContentState = Modifier.applyInlineStyle(
  //     contentState,
  //     selection,
  //     `FONTSIZE_${fontSize}`
  //   );
  //   setEditorState(
  //     EditorState.push(editorState, newContentState, "change-inline-style")
  //   );
  // };

  const handleFontSize = (fontSize) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // 기존 폰트 크기 스타일 제거
    const fontSizeStyles = [
      "FONTSIZE_8px",
      "FONTSIZE_12px",
      "FONTSIZE_14px",
      "FONTSIZE_16px",
      "FONTSIZE_18px",
      "FONTSIZE_20px",
    ];
    let newContentState = fontSizeStyles.reduce((state, style) => {
      return Modifier.removeInlineStyle(state, selection, style);
    }, contentState);

    // 새로운 폰트 크기 스타일 적용
    newContentState = Modifier.applyInlineStyle(
      newContentState,
      selection,
      `FONTSIZE_${fontSize}`
    );

    setEditorState(
      EditorState.push(editorState, newContentState, "change-inline-style")
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "20px",
      }}
    >
      <TextEdit handleStyle={handleStyle} handleFontSize={handleFontSize} />
      <Preview
        editorState={editorState}
        setEditorState={setEditorState}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};

export default App;
