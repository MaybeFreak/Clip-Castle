import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login", { state: { from: location } });
      } else {
        fetchUserData(user.uid);
      }
    });
  }, []);

  const fetchUserData = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log("Found User");
    } else {
      navigate("/profileSetup");
    }
  };

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default ProtectedRoute;
