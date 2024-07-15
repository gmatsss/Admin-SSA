import React, { useEffect } from "react";

const Yearlybot1 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "hq22wc989os",
          width: "100%",
          height: "100%",
        }).display();
      } catch (e) {
        console.error("[MC]", e);
      }
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="payment-container">
      <div id="mchq22wc989os"></div>
    </div>
  );
};

export default Yearlybot1;
