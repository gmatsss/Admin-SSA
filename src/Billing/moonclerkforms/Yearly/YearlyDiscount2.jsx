import { useEffect } from "react";

const YearlyDiscount2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "5cr9610e718b",
          width: "100%",
          height: "100%",
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
      <div id="mc5cr9610e718b"></div>
    </div>
  );
};

export default YearlyDiscount2;
