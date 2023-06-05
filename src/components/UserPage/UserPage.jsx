import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import UserInfo from "../UserInfo/UserInfo";
import ClipCard from "../ClipCard/ClipCard";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

function UserPage() {
  const [clips, setClips] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const fetchClips = async (user) => {
    const q = query(
      collection(db, "clips"),
      where("Owner", "==", user),
      limit(5)
    );
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });

    setClips(data);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (params.id === user.uid) navigate("/profile");
    });
    fetchClips(params.id);
  }, []);

  return (
    <>
      <main>
        <div className="infoAndClips">
          <UserInfo userId={params.id} />
          <div>
            <h2>Clips</h2>
            <div className="clips">
              {clips &&
                clips.map((clip, i) => <ClipCard key={i} clip={clip} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserPage;
