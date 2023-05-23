import { createPortal } from "react-dom";
import "./VideoModal.css";
import Card from "../Card/Card";

function VideoModal({ onClose, clip, userInfo, timeAgo }) {
  return createPortal(
    <div className="modal" onClick={onClose}>
      <Card>
        <div className="videoModalContent" onClick={(e) => e.stopPropagation()}>
          <div className="videoContainer">
            <video src={clip.Video} autoPlay controls />
          </div>
          <div className="clipInfo">
            <h2>{clip.Title}</h2>
            {userInfo ? <p>{userInfo.username}</p> : <p>{clip.Owner}</p>}
            <p>{timeAgo}</p>
            <ul className="tags">
              {clip.Tags.map((tag, i) => (
                <li key={i} className="tag">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </Card>
    </div>,
    document.getElementById("root")
  );
}

export default VideoModal;
