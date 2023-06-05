import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";

function UserPage() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (params.id === user.uid) navigate("/profile");
    });
  }, []);

  return (
    <>
      <div>This is the UserPage</div>
    </>
  );
}

export default UserPage;
