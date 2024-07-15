import React, { useEffect } from "react";

const ChannelTwo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "66ufq2drz6y8",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc66ufq2drz6y8 = new window.MoonclerkEmbed(opts);
        window.mc66ufq2drz6y8.display();
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
    <div id="mc66ufq2drz6y8" className="w-100">
      <a href="https://app.moonclerk.com/pay/66ufq2drz6y8">
        Charge for Two Channel
      </a>
    </div>
  );
};

export default ChannelTwo;
