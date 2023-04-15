import { useState } from "react";
import { analytics, auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        logEvent(analytics, "logged_in", user);
      })
      .catch((error) => {
        console.error(`${error.code} \n ${error.message}`);
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
