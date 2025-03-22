import React, { useEffect, useState } from "react";

const Typer = ({ sentence, onComplete }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = 50;
  const delay = 500;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          if (charIndex > 0) {
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            onComplete();
          }
        } else {
          if (charIndex < sentence.length) {
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), delay);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentence, speed, delay]);

  return (
    <span>
      {sentence.slice(0, charIndex)}
      <span className=" ml-1 animate-ping">|</span>
    </span>
  );
};

export default Typer;
