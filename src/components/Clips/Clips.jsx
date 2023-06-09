import React, { useEffect, useState } from "react";
import { analytics, db } from "../../firebase"; // Import db (Firestore) here
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import "./ClipsStyle.css";
import ClipCard from "../ClipCard/ClipCard";

const Clips = () => {
  const [clipData, setClipData] = useState(false);

  const fetchFirstFiveClips = async () => {
    const q = query(collection(db, "clips"), orderBy("timeCreated"), limit(5));
    const querySnapshot = await getDocs(q);

    logEvent(analytics, "pulled_first_five_clips");

    const clips = [];
    querySnapshot.forEach((doc) => {
      clips.push({ id: doc.id, data: doc.data() });
    });

    setClipData(clips);
  };

  useEffect(() => {
    fetchFirstFiveClips();
  }, []);

  return (
    <>
      <h1>Newest Clips</h1>
      <div className="clipsContainer">
        {clipData &&
          clipData.map((clip, i) => <ClipCard clip={clip} key={i} />)}
      </div>
    </>
  );
};

export default Clips;
