import { useEffect } from "react";

const MonthlyPlanDiscount2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;
    script.onload = () => {
      try {
        new window.MoonclerkEmbed({
          checkoutToken: "2x8enhf62b89",
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
      <div id="mc2x8enhf62b89"></div>
    </div>
  );
};

export default MonthlyPlanDiscount2;
