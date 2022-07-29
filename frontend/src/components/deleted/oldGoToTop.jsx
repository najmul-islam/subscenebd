import React, { useEffect, useState } from "react";
// import "./style/goToTop.css";

const GoToTop = () => {
  const [isVisable, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={isVisable ? `gototop active` : `gototop`}
    >
      Icon
    </div>
  );
};

export default GoToTop;
