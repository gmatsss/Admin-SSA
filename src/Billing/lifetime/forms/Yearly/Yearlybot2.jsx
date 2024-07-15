// Yearlybot2.js
import React, { useEffect } from "react";

const Yearlybot2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "32pu118wuvud",
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
      <div id="mc32pu118wuvud"></div>
    </div>
  );
};

export default Yearlybot2;
