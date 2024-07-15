// Panel.js
import "./panel.css";
import PanelRow from "./components/PanelRow";
import InfoBox from "./components/InfoBox";
import PanelCol from "./components/PanelCol";

const Panel = () => {
  return (
    <div className="panel-container">
      <PanelRow>
        <PanelCol>
          <div className="welcome-category">
            <InfoBox title="Welcome to SSA" type="main" />
          </div>
        </PanelCol>
        <PanelCol>
          <div className="support-category">
            <InfoBox title="Support" type="support" />
          </div>
        </PanelCol>
      </PanelRow>

      <PanelRow>
        <PanelCol>
          <div className="quickstart-category">
            <InfoBox title="Quick start" type="quickStart" />
          </div>
        </PanelCol>
        <PanelCol>
          <div className="video-container">
            <video src="" controls className="panel-video" width="100%"></video>
          </div>
        </PanelCol>
      </PanelRow>
    </div>
  );
};

export default Panel;
