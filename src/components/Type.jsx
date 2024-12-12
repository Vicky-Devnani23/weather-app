import React, { useState, useEffect } from "react";

const TypingAnimation = () => {
  const texts = ["Enter Your City", "Check the Weather", "Stay Updated"]; // Texts to display
  const typingSpeed = 100; // Speed for typing (ms per character)
  const erasingSpeed = 50; // Speed for erasing
  const delayBetween = 1000; // Delay between typing and erasing

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[loopIndex % texts.length];

      if (!isDeleting) {
        // Typing logic
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), delayBetween); // Wait before erasing
        }
      } else {
        // Erasing logic
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1); // Move to the next text
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loopIndex, texts]);

  return (
    <div className="text-[30px] font-semibold text-center text-white ">
      <span>{text}</span>
      <span className="border-r-2 border-gray-800 animate-blink">&nbsp;</span>
    </div>
  );
};

export default TypingAnimation;
