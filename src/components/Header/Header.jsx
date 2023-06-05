import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../../firebase";
import "./Header.css";

function Header({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      }
    });
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth).then(() => navigate("/login", { state: { from: location } }));
  };

  return (
    <>
      <header>
        <NavLink className={"none"} id="headerLogo" to={"/"}>
          <img
            className="headerLogo"
            src="\src\assets\Clip-Castle-favicon.png"
            alt="Clip-Castle"
          />
          <h1>Clip Castle</h1>
        </NavLink>
        <nav>
          <NavLink className={"lighten"} to={"/clips"}>
            clips
          </NavLink>
          <NavLink className={"lighten"} to={"/clips/upload"}>
            Upload
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink className={"lighten"} to={`/profile`}>
                Profile
              </NavLink>
              <button className="dark" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={"lighten"}
                to={"/login"}
                state={{ from: location }}
              >
                Login
              </NavLink>
              <NavLink className={"lighten"} to={"/register"}>
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </header>
      {children}
    </>
  );
}

export default Header;
