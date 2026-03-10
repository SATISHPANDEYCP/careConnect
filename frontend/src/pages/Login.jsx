import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        if (!otpStep) {
          const { data } = await axios.post(backendUrl + "/api/user/register", {
            name,
            email,
            password,
          });

          if (data.success) {
            setOtpStep(true);
            toast.success("OTP sent to your email!");
          } else {
            toast.error(data.message);
          }
        } else {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-otp",
            { email, otp: enteredOtp }
          );

          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("Account created successfully!");
            navigate("/"); // Redirect to homepage
            window.location.reload(); // Reload to reflect the logged-in state
          } else {
            toast.error(data.message);
          }
        }
      } else {
        // Login flow
        if (!showVerification) {
          const { data } = await axios.post(backendUrl + "/api/user/login", {
            email,
            password,
          });

          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("Login successful!");
            navigate("/"); // Redirect to homepage
          } else if (data.isVerified === false) {
            // User not verified, show verification UI
            setShowVerification(true);
            setEmail(data.email);
            toast.error(data.message);
          } else {
            toast.error(data.message);
          }
        } else {
          // Verify OTP during login
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-otp",
            { email, otp: enteredOtp }
          );

          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("Verification successful!");
            navigate("/"); // Redirect to homepage
          } else {
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const resendOtpHandler = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/resend-otp", {
        email,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {showVerification
            ? "Verify Your Account"
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </p>
        <p>
          {showVerification
            ? "Please verify your email to continue"
            : `Please ${state === "Sign Up" ? "sign up" : "log in"} to book appointment`}
        </p>

        {state === "Sign Up" && !otpStep && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            disabled={showVerification}
          />
        </div>

        {!otpStep && !showVerification && (
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
        )}

        {(otpStep || showVerification) && (
          <div className="w-full">
            <p>Enter OTP</p>
            <input
              onChange={(e) => setEnteredOtp(e.target.value)}
              value={enteredOtp}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={resendOtpHandler}
                className="text-primary text-sm underline cursor-pointer"
              >
                Resend OTP
              </button>
              <p className="text-xs text-gray-500">Check your email</p>
            </div>
          </div>
        )}

        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {otpStep || showVerification
            ? "Verify OTP"
            : state === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        {!showVerification && (
          <>
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setState("Login");
                    setOtpStep(false);
                    setShowVerification(false);
                  }}
                  className="text-primary underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create an new account?{" "}
                <span
                  onClick={() => {
                    setState("Sign Up");
                    setOtpStep(false);
                    setShowVerification(false);
                  }}
                  className="text-primary underline cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default Login;
