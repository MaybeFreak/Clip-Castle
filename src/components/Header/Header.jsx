import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../../firebase";
import "./Header.css";

function Header({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth).then(() => navigate("/login", { state: { from: location } }));
  };

  return (
    <>
      <header>
        <NavLink id="headerLogo" to={"/"}>
          <img
            className="headerLogo"
            src="\src\assets\Clip-Castle-favicon.png"
            alt="Clip-Castle"
          />
          <h1>Clip Castle</h1>
        </NavLink>
        <nav>
          <NavLink to={"/clips"}>clips</NavLink>
          <NavLink to={"/clips/upload"}>Upload</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to={"/profile"}>Profile</NavLink>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <NavLink to={"/login"} state={{ from: location }}>
                Login
              </NavLink>
              <NavLink to={"/register"}>Sign up</NavLink>
            </>
          )}
        </nav>
      </header>
      {children}
    </>
  );
}

export default Header;
