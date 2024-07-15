// SignIn.js
import React, { useContext, useState } from "react";
import "./SignIn.css";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Logo from "../../img/Logo.png";

const InfoSection = ({ title, content }) => {
  return (
    <div className="additional-content">
      <div>
        <p className="title">{title}</p>
      </div>
      <div className="detailsadd">{content}</div>
    </div>
  );
};

const SignIn = () => {
  const [activeSection, setActiveSection] = useState(0);

  const navigate = useNavigate();
  const { reloadUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation: Ensure email and password are not empty
    if (!email || !password) {
      toast.warning("Both fields are required!");
      return;
    }

    // Validation: Ensure email is in the correct format
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchData("User/login", "POST", {
        email,
        password,
      });

      if (response.user) {
        // Handle successful login
        toast.success("Login Success:", response.user);
        setLoading(false);
        await reloadUser(); // Reload the user after successful login
        navigate("/Admin");
      } else {
        toast.error(response.message || "Login Failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message); // Display the server's error message
    }
  };

  const contentData = [
    {
      title: "SSA Dashboard Overview",
      content:
        "Here, you will find all the tools necessary to efficiently manage and track your bots, oversee billing details, monitor bot performance, and access a range of support options. ",
    },

    {
      title: "SSA Tip",
      content: "Content for Section 2. Consectetur adipiscing elit...",
    },
  ];

  return (
    <div className="container-fluid-signin">
      <div className="d-flex justify-content-center">
        <img src={Logo} alt="" className="logologin" />
      </div>
      <div className="loginHolder">
        <h1
          style={{
            color: "#de416c",
            fontWeight: "700",
            textAlign: "center",
            fontSize: "46px",
          }}
        >
          Sign In
        </h1>

        <p className="text-black text-center h6">
          login using the credentials provided in the email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="form__group field mb-4 ">
              <input
                type="input"
                className="form__field"
                placeholder="Name"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="name" className="form__label">
                Email
              </label>
            </div>
            <div className="form__group field mb-5">
              <input
                type="password"
                className="form__field"
                placeholder="Name"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="name" className="form__label">
                Password
              </label>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <div className="lds-dual-ring1"></div> // Show loading spinner if loading
              ) : (
                "  Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
