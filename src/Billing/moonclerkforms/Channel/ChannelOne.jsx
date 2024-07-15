import React, { useEffect } from "react";

const ChannelOne = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "57aeke8yrox1",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc57aeke8yrox1 = new window.MoonclerkEmbed(opts);
        window.mc57aeke8yrox1.display();
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
    <div id="mc57aeke8yrox1" className="w-100">
      <a href="https://app.moonclerk.com/pay/57aeke8yrox1">
        Charge for One Channel
      </a>
    </div>
  );
};

export default ChannelOne;
