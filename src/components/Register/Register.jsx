import { createUserWithEmailAndPassword } from "firebase/auth";
import { analytics, auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        logEvent(analytics, "loggen_in", user);
      })
      .catch((e) => {
        const error = e.code.split("/")[1];
        switch (error) {
          case "invalid-email":
            setEmailError("Invalid Email");
            break;
          case "email-already-in-use":
            setEmailError("Email is already taken");
            break;
          case "missing-password":
            setPasswordError("Please enter a password");
            break;
          case "weak-password":
            setPasswordError("Password should be at least 6 characters");
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
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Register;
