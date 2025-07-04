import React from "react";

/**
 * GenerateComponent -renders a React component from a given HTML string dynamically.
 * @param {string} tag - The HTML tag to be used for the component.
 * @param {string} id - The unique identifier for the component.
 * @param {string} className - The CSS class name for the component.
 * @param {object} props - additional props (e.g , href, style).
 * @param {ReactNode} children - content inside the tag.
 */

function GenerateComponent({ tag ="div", id, className, props = {}, children }) {
    const Tag = tag;
    return (
        <Tag id={id} className={className} {...props}>
            {children}
        </Tag>
    );
}

export default GenerateComponent;