import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "@firebase/auth";
import ClipCard from "../ClipCard/ClipCard";

function Profile() {
  const [clips, setClips] = useState(false);

  const fetchOwnClips = async (user) => {
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
      fetchOwnClips(user);
    });
  }, []);

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
