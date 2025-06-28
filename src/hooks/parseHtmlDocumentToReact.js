import React from "react";

export function parseHtmlDocumentToReact(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const mainDiv = doc.querySelector("div.doc-content");
  if (!mainDiv) return null;
  let normalParagraph = doc.querySelector("div.doc-content p").className;
  console.log(normalParagraph);

  const VOID_TAGS = new Set(["img", "br", "hr", "input", "meta", "link"]);

  function parseStyleString(styleString) {
    const styleObj = {};
    styleString.split(";").forEach((decl) => {
      const [key, value] = decl.split(":");
      if (key && value) {
        const jsKey = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        styleObj[jsKey] = value.trim();
      }
    });
    return styleObj;
  }

  function transformNode(node, key) {
    if (node.nodeType === 3) {
      return node.textContent;
    }

    if (node.nodeType !== 1) return null;

    const tag = node.tagName.toLowerCase();
    const props = { key };

    for (const attr of node.attributes) {
      const name = attr.name.toLowerCase();
      const value = attr.value;

      switch (name) {
        case "class":
          // Optional: apply standardized class mappings here
          switch (tag) {
            case "h1":
              props.className = "c10";
              break;
            case "p":
                if (props.classList.includes( normalParagraph)){
                    props.className = "c2";
                }
              break;
            case "span":
              props.className = "c1";
              break;
            case "a":
              props.className = "c3";
              break;
            case "img":
              props.className = "c4";
              break;
            default:
              props.className = value;
          }
          break;
        case "href":
          props.href = value;
          break;
        case "src":
          props.src = value;
          break;
        case "alt":
          props.alt = value;
          break;
        case "style":
          props.style = parseStyleString(value);
          break;
        default:
          props[name] = value;
      }
    }

    if (VOID_TAGS.has(tag)) {
      return React.createElement(tag, props);
    }

    const children = Array.from(node.childNodes).map((child, idx) =>
      transformNode(child, `${key}-${idx}`)
    );

    return React.createElement(tag, props, children);
  }

  // Only return children of .doc-content
  return Array.from(mainDiv.childNodes).map((child, idx) =>
    transformNode(child, `child-${idx}`)
  );
}
