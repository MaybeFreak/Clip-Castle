import "./UserInfo.css";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "../Card/Card";

function UserInfo({ userId }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userId) fetchUserInfo(userId);
  }, [userId]);

  const fetchUserInfo = async (userId) => {
    const query = doc(db, "users", userId);
    const querySnapshot = (await getDoc(query)).data();
    setUserInfo(querySnapshot);
  };
  return (
    <>
      {userInfo && (
        <>
          <h2>User Info</h2>
          <Card>
            <div className="userInfo">
              <img src={userInfo.profilePictureURL} />
              <h2>{userInfo.username}</h2>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default UserInfo;
