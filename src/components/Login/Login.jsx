import { useState } from "react";
import { analytics, auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        logEvent(analytics, "logged_in", user);
      })
      .catch((e) => {
        const error = e.code.split("/")[1];
        switch (error) {
          case "invalid-email":
            setEmailError("Invalid Email");
            break;
          case "missing-password":
            setPasswordError("Please enter a password");
            break;
          case "wrong-password":
            setPasswordError("Incorrect Password");
            break;
          default:
            console.error(`${error}`);
        }
        return true;
      })
      .then((error) => {
        if (!error) navigate("/");
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
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
