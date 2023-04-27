import { NavLink } from "react-router-dom";
import "./ClipCard.css";

function ClipCard({ clip }) {
  const getTimeDifference = (timeCreated) => {
    const now = new Date();
    const noteTime = new Date(timeCreated.seconds * 1000);
    const diffInSeconds = Math.floor((now - noteTime) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

  return (
    <div className="clipCard">
      <div className="videoContainer">
        <video src={clip.data.Video} controls />
      </div>
      <div className="clipInfo">
        <h2>{clip.data.Title}</h2>
        <div className="whenWho">
          <NavLink to={"/profile"}>UserName</NavLink>
          <p>•</p>
          <p className="timeago">{getTimeDifference(clip.data.timeCreated)}</p>
        </div>
        <ul className="clipTags">
          {clip.data.Tags.map((tag, i) => (
            <li key={i} className="tag">
              #{tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="clipCardButtons">
        <p>Like</p>
        <p>Share</p>
      </div>
    </div>
  );
}

export default ClipCard;
