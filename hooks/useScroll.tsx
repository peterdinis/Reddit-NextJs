
import React from "react";
import styles from "../styles/Component.module.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState<Boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={styles.iconDiv}>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className={styles.iconWrapper}
        >
          Back to top
        </div>
      )}
    </div>
  );
}
