import React, { useEffect } from "react";

const ChannelSix = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "2mamn5hzc2an",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc2mamn5hzc2an = new window.MoonclerkEmbed(opts);
        window.mc2mamn5hzc2an.display();
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
    <div id="mc2mamn5hzc2an" className="w-100">
      <a href="https://app.moonclerk.com/pay/2mamn5hzc2an">
        Charge for Six Channel
      </a>
    </div>
  );
};

export default ChannelSix;
