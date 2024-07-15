import React, { useEffect } from "react";

const ChannelThree = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "3lunsb99kqou",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc3lunsb99kqou = new window.MoonclerkEmbed(opts);
        window.mc3lunsb99kqou.display();
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
    <div id="mc3lunsb99kqou" className="w-100">
      <a href="https://app.moonclerk.com/pay/3lunsb99kqou">
        Charge for Three Channel
      </a>
    </div>
  );
};

export default ChannelThree;
