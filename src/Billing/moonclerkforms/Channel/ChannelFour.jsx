import React, { useEffect } from "react";

const ChannelFour = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://d2l7e0y6ygya2s.cloudfront.net/assets/embed.js";
    script.async = true;

    const opts = {
      checkoutToken: "32peuzshrbrp",
      width: "100%",
    };

    script.onload = script.onreadystatechange = function () {
      const rs = this.readyState;
      if (rs && rs !== "complete" && rs !== "loaded") return;
      try {
        window.mc32peuzshrbrp = new window.MoonclerkEmbed(opts);
        window.mc32peuzshrbrp.display();
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
    <div id="mc32peuzshrbrp" className="w-100">
      <a href="https://app.moonclerk.com/pay/32peuzshrbrp">
        Charge for Four Channel
      </a>
    </div>
  );
};

export default ChannelFour;
