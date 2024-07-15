// useProduktlyScript.js
import { useEffect } from "react";

const useProduktlyScript = (shouldLoadScript) => {
  useEffect(() => {
    if (!shouldLoadScript) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://public.produktly.com/js/main.js";
    script.setAttribute("id", "produktlyScript");
    script.dataset.clientToken =
      "97781115e11f94da9dd1c20c1138c9b61886c197de2599bb5feb22f3def0494b356d89e1cdf1d25319f697f70062c3341166980820e794be3b0eec9df041720fb97e428d9fb672bc92c8174c3c77434bd263914a48fc66f15f920ac2b97ceee68d7be4b1";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [shouldLoadScript]);
};

export default useProduktlyScript;
