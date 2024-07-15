import React, { useState } from "react";
import "./Signup.css";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add this state to track loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation: Ensure all fields are not empty
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("All fields are required!");
      return;
    }

    // Validation: Ensure email is in the correct format
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address!");
      return;
    }

    // Validation: Ensure password and confirmPassword are the same
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetchData("User/register", "POST", {
        name,
        email,
        password,
        role: "Admin",
      });

      // Check if there's an error in the response
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
        return;
      }

      // Handle successful registration
      if (response.data) {
        toast.info(response.data.message);
        navigate("/Signin");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center signup"
      style={{ minHeight: "89.2vh" }} // Set the min-height to 100vh
    >
      <div
        className="loginHolder p-5 rounded"
        style={{ backgroundColor: "rgba(76, 77, 98, 0.95)" }}
      >
        <h1 style={{ color: "#27b3df", fontWeight: "600" }}>
          Admin Registration
        </h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          provident molestiae amet mollitia, omnis facere.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div class="form__group field mb-3 ">
              <input
                type="input"
                class="form__fieldsign"
                placeholder="Name"
                required=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label for="name" class="form__label">
                Fullname
              </label>
            </div>
            <div class="form__group field mb-3">
              <input
                type="input"
                class="form__fieldsign"
                placeholder="Name"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="name" class="form__label">
                Email
              </label>
            </div>
            <div class="form__group field mb-3">
              <input
                type="password"
                class="form__fieldsign"
                placeholder="Name"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="name" class="form__label">
                Password
              </label>
            </div>
            <div class="form__group field mb-5">
              <input
                type="password"
                class="form__fieldsign"
                placeholder="Name"
                required=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label for="name" class="form__label">
                Confirm Password
              </label>
            </div>
            <button type="submit" className="btn-signup" disabled={loading}>
              {loading ? (
                <div className="lds-dual-ring"></div> // Show loading spinner if loading
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p>
            Do you have a account?{" "}
            <Link
              to="/Signin"
              style={{ textDecoration: "none", color: "#de416c" }}
            >
              Signin Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
