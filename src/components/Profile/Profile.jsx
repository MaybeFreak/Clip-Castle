import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import ClipCard from "../ClipCard/ClipCard";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [clips, setClips] = useState(false);
  const params = useParams();

  const fetchClips = async (user) => {
    const q = query(
      collection(db, "clips"),
      where("Owner", "==", user.uid),
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
      fetchClips(user);
    });
  }, [params]);

  return (
    <main>
      <div>Your Profile</div>
      <h2>Your Clips</h2>
      <div>
        {clips && clips.map((clip, i) => <ClipCard key={i} clip={clip} />)}
      </div>
    </main>
  );
}

export default Profile;
