import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailLogin } from "../../utils/Authentication";

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
        navigate("/");
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
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
