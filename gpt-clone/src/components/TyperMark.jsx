import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const TyperMark = ({ sentence }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = 5;

  // Extract text from ReactMarkdown JSX
  const plainText =
    typeof sentence === "string" ? sentence : extractText(sentence);

  console.log("sentence: ", sentence);
  useEffect(() => {
    if (charIndex < plainText.length) {
      const timeout = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, plainText, speed]);

  return (
    <span className="w-5xl  whitespace-pre-wrap break-words">
      {/* Render Markdown but only show the sliced text */}{" "}
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]} // Enables raw HTML parsing
        allowedElements={["h1", "h2", "p", "strong", "ul", "li", "span"]}
      >
        {plainText.slice(0, charIndex)}
      </ReactMarkdown>
      {/* Blinking cursor */}
      <span className="ml-1 w-[5px] h-[1em] bg-black animate-blink"></span>
    </span>
  );
};

// Function to extract text from JSX (ReactMarkdown)
const extractText = (jsxElement) => {
  if (typeof jsxElement === "string") return jsxElement;
  if (Array.isArray(jsxElement)) return jsxElement.map(extractText).join(" ");
  if (jsxElement?.props?.children)
    return extractText(jsxElement.props.children);
  return "";
};

export default TyperMark;
