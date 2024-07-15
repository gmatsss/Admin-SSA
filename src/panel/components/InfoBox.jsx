// InfoBox.js
import LinkItem from "./LinkItem";
import { useNavigate } from "react-router-dom";

const InfoBox = ({ title, type }) => {
  const navigate = useNavigate();

  if (type === "main") {
    return (
      <div className="box">
        <h1>{title}</h1>
        <div>
          <p>
            Dive into our detailed guide to explore the features and benefits we
            offer. Learn more about the foundation and philosophy behind SSA,
            and discover how we are revolutionizing the way users interact with
            our platform. Whether you're a newbie or a seasoned user, our guide
            is tailored to give you a seamless experience. Join us on this
            journey and uncover the full potential of SSA.
          </p>
          <div>
            <button
              className="start-training-btn"
              onClick={() => navigate("/Admin/configs")}
            >
              Start Training
            </button>
            <button
              className="submit-ticket-btn"
              onClick={() => navigate("/Admin/submitticket")}
            >
              Submit ticket
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === "support") {
    return (
      <div className="box red-box">
        <h1>{title}</h1>
        <div>
          <p>Email: support@supersmartagents.com</p>
          <p>Phone: 888-985-6854</p>
          <p>Live Chat: click the bubble chat widget below</p>
          <p>Support Ticket: click the sidebar submit ticket</p>
        </div>
      </div>
    );
  } else if (type === "quickStart") {
    return (
      <div className="box blue-box">
        <h1>{title}</h1>
        <div className="link-container">
          <LinkItem
            link="https://wiki.supersmartagents.com/item/Introduction%20to%20SSA"
            title="🚀 Introduction to SSA"
            description="• Get a comprehensive overview of what SSA offers and how it stands out in the industry."
          />
          <LinkItem
            link="https://wiki.supersmartagents.com/item/Best%20Practices"
            title="🔧 Best Practices"
            description="• Discover the recommended ways to utilize SSA for maximum efficiency and results."
          />
          <LinkItem
            link="https://wiki.supersmartagents.com/item/Features%20and%20Capabilities"
            title="🧰 Features and Capabilities"
            description="• Explore the diverse set of tools and features that SSA brings to the table."
          />
          <LinkItem
            link="https://wiki.supersmartagents.com/item/Industries%20and%20Use%20Cases"
            title="🏢 Industries and Use Cases"
            description="• Learn how SSA is used across various sectors and how it caters to unique needs."
          />
        </div>
      </div>
    );
  }
};

export default InfoBox;
