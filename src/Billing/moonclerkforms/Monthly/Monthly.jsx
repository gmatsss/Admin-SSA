import React, { useEffect } from "react";

const Monthly = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "4fxlmtbqlrn4",
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
    <div className="payment-containerplan">
      <div id="mc4fxlmtbqlrn4">
        <a href="https://app.moonclerk.com/pay/4fxlmtbqlrn4">Monthly payment</a>
      </div>
    </div>
  );
};

export default Monthly;
