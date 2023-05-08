import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailRegister, GoogleSignIn } from "../../utils/Authentication";

function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    EmailRegister(email, password).then((res) => {
      if (res.error) {
        if (res.error.email) {
          setEmailError(res.error.email);
        } else if (res.error.password) {
          setPasswordError(res.error.password);
        } else {
          console.error(res.error);
        }
      } else {
        navigate("/profileSetup");
      }
    });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    GoogleSignIn().then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div>This is the register page</div>
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
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleGoogleSignIn}>Sign up with Google</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Register;
