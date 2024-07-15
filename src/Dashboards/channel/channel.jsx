import React from "react";
import "./Channel.css";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { SiZapier } from "react-icons/si";
import { BiMessageSquareDots } from "react-icons/bi"; // Alternative for FB Messenger

const Channel = ({ onboardingDetails }) => {
  const { channels } = onboardingDetails || {};

  const brandColors = {
    Twilio: "hsl(348, 89%, 70%)", // Lighter shade of #F22F46
    Zapier: "hsl(19, 100%, 65%)", // Lighter shade of #FF4A00
    CustomAPI: "hsl(198, 100%, 65%)", // Lighter shade of #0DABE6
    "Custom API": "hsl(198, 100%, 65%)", // Lighter shade of #0DABE6
    "Web Chat": "hsl(141, 76%, 60%)", // Lighter shade of #25D366
    "FB Messenger": "hsl(211, 100%, 65%)", // Lighter shade of #0084FF
    WhatsApp: "hsl(141, 76%, 60%)", // Same as Web Chat for consistency
  };

  const channelIcons = {
    Twilio: <BiMessageSquareDots />, // Alternative icon
    Zapier: <SiZapier />,
    CustomAPI: null, // No icon for Custom API
    "Custom API": <BiMessageSquareDots />,
    "Web Chat": <FaWhatsapp />,
    "FB Messenger": <FaTelegramPlane />,
    WhatsApp: <FaWhatsapp />,
  };

  if (!channels || channels.length === 0) {
    return <div>No channels available.</div>;
  }

  console.log(channels);

  return (
    <div className="channel-container">
      {channels.map(
        (channelGroup, groupIndex) =>
          channelGroup.channels &&
          channelGroup.channels.length > 0 && (
            <div key={channelGroup._id["$oid"]} className="channel-card">
              {channelGroup.verifchannelcode && (
                <div className="verification-code">
                  Verification Code: {channelGroup.verifchannelcode}
                </div>
              )}

              <div className="channel-services">
                {channelGroup.channels.map((channel, channelIndex) => (
                  <span
                    key={channel._id["$oid"]}
                    className="service"
                    style={{
                      backgroundColor:
                        brandColors[channel.channelName] || "#f2f2f2",
                    }}
                  >
                    {channelIcons[channel.channelName]} {/* Icon */}
                    {channel.channelName}
                  </span>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Channel;
