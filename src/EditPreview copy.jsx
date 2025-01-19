import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const EditPreview = ({ selectedData, setSelectedData }) => {
  const editorInstance = useRef(null);

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
            Array.from(row.cells).map((cell) => cell.textContent)
          );

          blocks.push({
            type: "table",
            data: {
              withHeadings: true,
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
        let text = block.data.text;
        return text;
      }
      return "";
    });

    return htmlParts.join("\n");
  };

  useEffect(() => {
    const cleanupEditorInstance = async () => {
      if (editorInstance.current) {
        try {
          await editorInstance.current.isReady;
          editorInstance.current.destroy();
        } catch (err) {
          console.error("Error during EditorJS cleanup: ", err);
        } finally {
          editorInstance.current = null;
        }
      }
    };

    const initializeEditor = () => {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: {
          blocks: parseHTMLToBlocks(selectedData),
        },
        onChange: async () => {
          const html = await convertBlocksToHTML();
          setSelectedData(html);
        },
      });
    };

    cleanupEditorInstance().then(initializeEditor);

    return () => {
      cleanupEditorInstance();
    };
  }, [selectedData]);

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
        `}
      </style>
    </div>
  );
};

export default EditPreview;
