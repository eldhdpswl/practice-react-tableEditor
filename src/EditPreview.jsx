import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";

// 에디터 도구 설정을 상수로 분리
const EDITOR_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: ["bold", "italic", "underline"],
    config: {
      preserveBlank: true,
    },
  },
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
    inlineToolbar: ["bold", "italic", "underline"],
  },
  table: {
    class: Table,
    inlineToolbar: ["bold", "italic", "underline"],
    config: {
      withHeadings: false,
      rows: 2,
      cols: 3,
    },
  },
  list: {
    class: List,
    inlineToolbar: ["bold", "italic", "underline"],
  },
  underline: Underline,
};

const EditPreview = ({ selectedData, setSelectedData }) => {
  const editorInstance = useRef(null);

  // HTML 문자열을 EditorJS의 블록 데이터 형식으로 변환
  const parseHTMLToBlocks = (htmlString) => {
    if (!htmlString) return [];

    const blocks = [];
    const parts = htmlString.split("\n");

    parts.forEach((part) => {
      if (part.startsWith("<table>")) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(part, "text/html");
        const table = doc.querySelector("table");

        if (table) {
          const rows = Array.from(table.rows).map((row) =>
            Array.from(row.cells).map((cell) => {
              // HTML 태그를 보존하여 셀 내용 반환
              return cell.innerHTML;
            })
          );

          blocks.push({
            type: "table",
            data: {
              withHeadings: false,
              content: rows,
            },
          });
        }
      } else if (part.trim()) {
        blocks.push({
          type: "paragraph",
          data: {
            text: part.trim(),
          },
        });
      }
    });

    return blocks;
  };

  // EditorJS의 블록 데이터를 HTML로 변환
  const convertBlocksToHTML = async () => {
    if (!editorInstance.current) return "";

    const savedData = await editorInstance.current.save();
    const blocks = savedData.blocks || [];

    const htmlParts = blocks.map((block) => {
      if (block.type === "table") {
        const rows = block.data.content;
        return `<table>${rows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
          )
          .join("")}</table>`;
      }
      if (block.type === "paragraph") {
        return block.data.text; // HTML 태그가 포함된 텍스트 반환
      }
      return "";
    });

    return htmlParts.join("\n");
  };

  useEffect(() => {
    let editor = null;

    const initializeEditor = async () => {
      // 기존 에디터가 있다면 제거
      if (editorInstance.current) {
        try {
          // isReady 상태를 확인하고 destroy 호출
          if (editorInstance.current.isReady) {
            await editorInstance.current.isReady;
            editorInstance.current.destroy();
          }
          editorInstance.current = null;
        } catch (err) {
          console.error("Error during cleanup:", err);
        }
      }

      const editorConfig = {
        holder: "editorjs",
        tools: EDITOR_TOOLS,
        data: {
          blocks: parseHTMLToBlocks(selectedData),
        },
        onChange: async () => {
          const html = await convertBlocksToHTML();
          setSelectedData(html);
        },
        inlineToolbar: ["bold", "italic", "underline"],
        placeholder: "텍스트를 입력하세요...",
      };

      editor = new EditorJS(editorConfig);
      await editor.isReady;
      editorInstance.current = editor;
    };

    initializeEditor().catch(console.error);

    // cleanup 함수
    return () => {
      const cleanup = async () => {
        if (editorInstance.current && editorInstance.current.isReady) {
          try {
            await editorInstance.current.isReady;
            editorInstance.current.destroy();
            editorInstance.current = null;
          } catch (err) {
            console.error("Error during cleanup:", err);
          }
        }
      };
      cleanup();
    };
  }, [selectedData, setSelectedData]);

  return (
    <div style={{ width: "70%", padding: "10px" }}>
      <h3>데이터 미리보기 및 편집</h3>
      <div
        id="editorjs"
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "20px",
          backgroundColor: "white",
          minHeight: "500px",
        }}
      />
      <style>
        {`
          .codex-editor__redactor {
            padding-bottom: 100px !important;
          }
          .ce-block__content {
            max-width: 100% !important;
            margin: 0;
          }
          .ce-toolbar__content {
            max-width: 100% !important;
            margin: 0;
          }
          .ce-block--selected .ce-block__content {
            background: #e1f2ff;
          }
          .ce-inline-toolbar {
            background: #fff;
            border: 1px solid #ddd;
            box-shadow: 0 3px 15px -3px rgba(13,20,33,.13);
          }
          .ce-inline-toolbar__buttons {
            display: flex;
            align-items: center;
          }
          .ce-inline-tool {
            padding: 6px;
            margin: 0 3px;
            cursor: pointer;
          }
          .ce-inline-tool--active {
            background: #eff2f5;
          }
          
          /* 텍스트 정렬 스타일 */
          .ce-block--text-left {
            text-align: left;
          }
          .ce-block--text-center {
            text-align: center;
          }
          .ce-block--text-right {
            text-align: right;
          }
          
          /* 밑줄 스타일 */
          .ce-inline-tool-underline {
            text-decoration: underline;
          }
          
          /* 색상 도구 스타일 */
          .ce-inline-toolbar__color-picker {
            padding: 6px;
          }
          
          .ce-inline-toolbar__color-picker button {
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-radius: 2px;
            margin: 2px;
            padding: 0;
            cursor: pointer;
          }
          
          .ce-inline-toolbar__color-picker button:hover {
            transform: scale(1.1);
          }
          
          /* 테이블 셀 스타일 */
          .tc-table td {
            border: 1px solid #ccc;
            padding: 8px;
          }
          
          .tc-table tr:first-child td {
            background-color: #f8f9fa;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default EditPreview;
