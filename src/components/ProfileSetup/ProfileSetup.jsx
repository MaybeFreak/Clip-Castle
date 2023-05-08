import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUid(user.uid);
    });
  }, []);

  const complete = async (e) => {
    e.preventDefault();

    try {
      // Upload profile picture to Firebase Storage
      const storageRef = ref(storage, `profile_pictures/${uid}`);
      await uploadBytes(storageRef, profilePicture);
      const profilePictureURL = await getDownloadURL(storageRef);

      // Save the username and profile picture URL to Firestore
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, {
        username: username,
        profilePictureURL: profilePictureURL,
      });

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>Create Profile</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <button onClick={complete}>Complete</button>
      </form>
    </>
  );
}

export default ProfileSetup;
