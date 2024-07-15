import React, { useEffect } from "react";

const ChannelFive = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "1uxzlj3t2we0",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc1uxzlj3t2we0 = new window.MoonclerkEmbed(opts);
        window.mc1uxzlj3t2we0.display();
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
    <div id="mc1uxzlj3t2we0" className="w-100">
      <a href="https://app.moonclerk.com/pay/1uxzlj3t2we0">
        Charge for Five Channel
      </a>
    </div>
  );
};

export default ChannelFive;
