import { useEffect } from "react";

const YearlyDiscount1 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "794urmwzqh1k",
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
      <div id="mc794urmwzqh1k"></div>
    </div>
  );
};

export default YearlyDiscount1;
