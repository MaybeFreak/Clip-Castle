import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailLogin, GoogleSignIn } from "../../utils/Authentication";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname;

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    EmailLogin(email, password).then((res) => {
      if (res.error) {
        if (res.error.email) {
          setEmailError(res.error.email);
        } else if (res.error.password) {
          setPasswordError(res.error.password);
        } else {
          console.error(res.error);
        }
      } else {
        navigate(from);
      }
    });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();

    GoogleSignIn().then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        navigate(from);
      }
    });
  };

  return (
    <>
      <div>This is the login page</div>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError !== null && <p>{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError !== null && <p>{passwordError}</p>}
        </div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
