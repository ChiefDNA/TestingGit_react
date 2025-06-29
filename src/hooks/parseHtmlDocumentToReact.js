import React from "react";

export function parseHtmlDocumentToReact(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const mainDiv = doc.querySelector("div.doc-content");
  if (!mainDiv) return null;

  const VOID_TAGS = new Set(["img", "br", "hr", "input", "meta", "link"]);


  const cat1 = new Set(); 
  const cat2 = new Set(); 
  const cat3 = new Set(); 
  const cat4 = new Set(); 
  const cat5 = new Set(); 

  
  const spcat1 = new Set(); 
  const spcat2 = new Set(); 
  const spcat3 = new Set();
  const spcat4 = new Set();
  const spcat5 = new Set(); 
  const spcat6 = new Set();
  const spcat7 = new Set(); 
  const spcat8 = new Set(); 
  
  const firstParagraph = doc.querySelector("div.doc-content p");
  let normalParagraphClass = "";
  if (firstParagraph) {
    const classList = firstParagraph.getAttribute("class") || "";
    normalParagraphClass = classList.trim().split(/\s+/).sort().join(" ");
    cat1.add(normalParagraphClass); 
  }

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

  function classifyParagraph(originalClassSetStr) {
    if (cat1.has(originalClassSetStr)) return "c2";
    if (cat2.has(originalClassSetStr)) return "c2 c4";
    if (cat3.has(originalClassSetStr)) return "c2 c5";
    if (cat4.has(originalClassSetStr)) return "c2 c6";
    if (cat5.has(originalClassSetStr)) return "c2 c7";

    if (cat2.size === 0) {
      cat2.add(originalClassSetStr);
      return "c2 c4";
    } else if (cat3.size === 0) {
      cat3.add(originalClassSetStr);
      return "c2 c5";
    } else if (cat4.size === 0) {
      cat4.add(originalClassSetStr);
      return "c2 c5";
    } else if (cat5.size === 0) {
      cat5.add(originalClassSetStr);
      return "c2 c5";
    }
    return "";
  }
  function classifySpan(originalClassSetStr) {
    if (spcat1.has(originalClassSetStr)) return "c1";
    if (spcat2.has(originalClassSetStr)) return "c1";
    if (spcat3.has(originalClassSetStr)) return "c1";
    if (spcat4.has(originalClassSetStr)) return "c1";
    if (spcat5.has(originalClassSetStr)) return "c1 bold";
    if (spcat6.has(originalClassSetStr)) return "c1";
    if (spcat7.has(originalClassSetStr)) return "c1";
    if (spcat8.has(originalClassSetStr)) return "c1 bold italics";

    if (spcat2.size === 0) {
      spcat2.add(originalClassSetStr);
      return "c1";
    } else if (spcat3.size === 0) {
      spcat3.add(originalClassSetStr);
      return "c1";
    } else if (spcat4.size === 0) {
      spcat4.add(originalClassSetStr);
      return "c1";
    } else if (spcat5.size === 0) {
      spcat5.add(originalClassSetStr);
      return "c1 bold";
    } else if (spcat6.size === 0) {
      spcat6.add(originalClassSetStr);
      return "c1";
    } else if (spcat7.size === 0) {
      spcat7.add(originalClassSetStr);
      return "c1";
    } else if (spcat8.size === 0) {
      spcat8.add(originalClassSetStr);
      return "c1 bold italics";
    }

    return "c1";
  }

  function transformNode(node, key) {
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1) return null;

    const tag = node.tagName.toLowerCase();
    const props = { key };

    let classSetStr = "";
    if (node.hasAttribute("class")) {
      classSetStr = node.getAttribute("class").trim().split(/\s+/).sort().join(" ");
    }

    for (const attr of node.attributes) {
      const name = attr.name.toLowerCase();
      const value = attr.value;

      switch (name) {
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
        // Don't handle "class" here; we handle it below
        default:
          if (name !== "class") props[name] = value;
      }
    }

    if (tag === "p") {
      const normalizedClass = classifyParagraph(classSetStr);
      if (normalizedClass) props.className = normalizedClass;
    } else if (tag === "h1") {
      props.className = "c10";
    } else if (tag === "span") {
      const normalizedClass = classifySpan(classSetStr);
      if (normalizedClass) props.className = normalizedClass;
    } else if (tag === "a") {
      props.className = "c3";
    } else if (tag === "img") {
      props.className = "c4";
    } else if (classSetStr) {
      props.className = classSetStr; // fallback for non-p
    }
    if(tag === 'img'){
        props.className = '';
    }

    if (VOID_TAGS.has(tag)) {
      return React.createElement(tag, props);
    }

    const children = Array.from(node.childNodes).map((child, idx) =>
      transformNode(child, `${key}-${idx}`)
    );

    return React.createElement(tag, props, children);
  }

  return Array.from(mainDiv.childNodes).map((child, idx) =>
    transformNode(child, `child-${idx}`)
  );
}
