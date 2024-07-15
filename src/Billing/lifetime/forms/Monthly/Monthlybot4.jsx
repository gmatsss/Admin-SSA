// Monthlybot4.js
import React, { useEffect } from "react";

const Monthlybot4 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "5nplzoj3ga0r",
          width: "100%",
        }).display();
      } catch (e) {
        console.error("[MC]", e);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="payment-container">
      <div id="mc5nplzoj3ga0r"></div>
    </div>
  );
};

export default Monthlybot4;
