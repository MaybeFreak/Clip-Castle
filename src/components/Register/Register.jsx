import { createUserWithEmailAndPassword } from "firebase/auth";
import { analytics, auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        logEvent(analytics, "loggen_in", user);
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
      <div>This is the register page</div>
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
        <button onClick={handleRegister}>Register</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Register;
