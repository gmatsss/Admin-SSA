import React from "react";

const TawkToEmbed = ({ name, email }) => {
  // Construct the URL for the iframe with the user's details
  const iframeURL = `https://tawk.to/chat/653801d5f2439e1631e7f705/1hdhcebje?name=${encodeURIComponent(
    name
  )}&email=${encodeURIComponent(email)}`;

  return (
    <iframe
      src={iframeURL}
      title="Tawk.to Chat Embed"
      style={{ width: "100%", height: "400px", border: "none" }}
      scrolling="no"
    ></iframe>
  );
};

export default TawkToEmbed;
