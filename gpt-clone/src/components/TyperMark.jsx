import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const TyperMark = ({ sentence }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = 1;

  // Extract text from ReactMarkdown JSX
  const plainText =
    typeof sentence === "string" ? sentence : extractText(sentence);

  useEffect(() => {
    if (charIndex < plainText.length) {
      const timeout = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, plainText, speed]);

  return (
    <span className="text-white   break-words whitespace-pre-wrap w-5xl">
      {/* Render Markdown but only show the sliced text */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]} // Enables raw HTML parsing
      >
        {plainText.slice(0, charIndex)}
      </ReactMarkdown>
      {/* Blinking cursor */}

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
