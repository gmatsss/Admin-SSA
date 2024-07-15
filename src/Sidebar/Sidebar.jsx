import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Logo.png";
import question from "../img/question.png";
import support from "../img/support.png";
import configuration from "../img/settings.png";
import dashboard from "../img/dashboard.png";
import dollar from "../img/dollar.png";
import todo from "../img/todo.png";
import roadmap from "../img/roadmap.png";
import promotion from "../img/promotion.png";
import affiliate from "../img/affiliate.png";
import "./Sidebar.css";
import UserContext from "../Context/UserContext";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const { user, announcements } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const countIncompleteTodos = () => {
    return announcements.reduce((count, announcement) => {
      return (
        count +
        announcement.todos.reduce((todoCount, todo) => {
          return todoCount + (todo.completed ? 0 : 1);
        }, 0)
      );
    }, 0);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    const fullPath = `/Admin${path}`; // Add the /Admin prefix
    return location.pathname === fullPath ? "active" : "";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Call the function once to set the initial state
    handleResize();

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-sidebar" />
          <hr />
        </div>
        <div className="sidebar-content p-2">
          {user && user.role === "Admin" && (
            <>
              <Link to="./" className={`sidebar-item ${isActive("/")}`}>
                <img
                  src={dashboard}
                  alt="Dashboard Icon"
                  className="icon-invert"
                />
                <span>User list</span>
                <span className="tooltip-sidebar">User list</span>
              </Link>

              <Link to="./Todo" className={`sidebar-item ${isActive("/Todo")}`}>
                <img src={todo} alt="Todo Icon" className="icon-invert" />
                <span>Todo</span>

                <span className="badge">{countIncompleteTodos()}</span>

                <span className="tooltip-sidebar">Todo</span>
              </Link>

              <Link
                to="./Roadmap"
                className={`sidebar-item ${isActive("/Roadmap")}`}
              >
                <img src={roadmap} alt="Help Icon" className="icon-invert" />
                <span>Roadmap</span>
                <span className="tooltip-sidebar">Roadmap</span>
              </Link>
              <Link
                to="./Notice"
                className={`sidebar-item ${isActive("/Notice")}`}
              >
                <img src={promotion} alt="Help Icon" className="icon-invert" />
                <span>Notice</span>
                <span className="tooltip-sidebar">Notice</span>
              </Link>
              <Link
                to="./Playai"
                className={`sidebar-item ${isActive("/Notice")}`}
              >
                {/* <img src={promotion} alt="Help Icon" className="icon-invert" /> */}
                <span>playai</span>
                <span className="tooltip-sidebar">playai</span>
              </Link>
            </>
          )}
          {user && user.role === "user" && (
            <>
              <Link to="./" className={`sidebar-item ${isActive("/")}`}>
                <img
                  src={dashboard}
                  alt="Configuration Icon"
                  className="icon-invert"
                />
                <span>Control Panel</span>
                <span className="tooltip-sidebar">Control Panel</span>
              </Link>

              <Link
                to="./configs"
                className={`sidebar-item ${isActive("/configs")}`}
              >
                <img
                  src={configuration}
                  alt="Configsuration Icon"
                  className="icon-invert"
                />
                <span>Configuration</span>
                <span className="tooltip-sidebar">Configuration</span>
              </Link>

              <Link
                to="./submitticket"
                className={`sidebar-item ${isActive("/submitticket")}`}
              >
                <img
                  src={support}
                  alt="Contact Us Icon"
                  className="icon-invert"
                />
                <span>Submit Ticket</span>
                <span className="tooltip-sidebar">Submit Ticket</span>
              </Link>

              <Link
                to="./Billing"
                className={`sidebar-item ${isActive("/Billing")}`}
              >
                <img
                  src={dollar}
                  alt="Contact Us Icon"
                  className="icon-invert"
                />
                <span>Billing</span>
                <span className="tooltip-sidebar">Billing</span>
              </Link>

              <a
                href="https://supersmartagents.firstpromoter.com/signup/22054"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
              >
                <img
                  src={affiliate}
                  alt="Contact Us Icon"
                  className="icon-invert"
                />
                <span>Affiliates</span>
                <span className="tooltip-sidebar">Affiliates</span>
              </a>
              <a
                href="https://wiki.supersmartagents.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
              >
                <img src={question} alt="Help Icon" className="icon-invert" />
                <span>Kowledge Base</span>
                <span className="tooltip-sidebar">Help</span>
              </a>
            </>
          )}
        </div>

        <button className="sidebar-button" onClick={toggleSidebar}>
          {isOpen ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
