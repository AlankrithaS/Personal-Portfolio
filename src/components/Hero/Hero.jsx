import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

const roles = [
  "UI/UX Designer",
  "Software Engineer",
  "Front-End Developer",
  "Full-Stack Developer",
  "Cloud Architect",
  "DevOps Engineer"
];

function Typewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Index of the current role
  const [charIndex, setCharIndex] = useState(0); // Index of the character being typed
  const [isDeleting, setIsDeleting] = useState(false); // Whether we are deleting text
  const [delay, setDelay] = useState(100); // Default delay for typing speed

  useEffect(() => {
    const typeEffect = setTimeout(() => {
      const currentRole = roles[index];

      if (!isDeleting) {
        // Typing logic
        setText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        // If the word is fully typed, pause before deleting
        if (charIndex === currentRole.length) {
          setIsDeleting(true);
          setDelay(2000); // Pause for 1 second before deleting
        }
      } else {
        // Deleting logic
        setText(""); // Clear the text immediately during deletion
        setCharIndex(0); // Reset charIndex to 0 to skip showing deletion

        // If the word is fully deleted, move to the next role
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length); // Loop through roles
          setDelay(100); // Resume normal typing speed
        }
      }
    }, isDeleting ? 80 : delay); // Use faster speed for deleting

    return () => clearTimeout(typeEffect);
  }, [text, isDeleting, charIndex, delay, index]);

  return <span>{text}</span>;
}

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Alankritha</h1>
        <p className={styles.description}>
          <Typewriter /> {/* Typing effect */}
        </p>
        <a href="mailto:myemail@email.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.jpg")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
