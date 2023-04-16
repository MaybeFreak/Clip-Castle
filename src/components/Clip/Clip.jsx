function Clip({ clip, i }) {
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
    <div key={i} data-aos="fade-up" className="clipContainer">
      <h2 style={{ marginTop: 0 }}>
        {clip.data.Title} - {getTimeDifference(clip.data.timeCreated)}
      </h2>
      <video
        src={clip.data.Video}
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        controls
      />
      <div
        style={{
          position: "absolute",
          bottom: -25,
          left: 0,
          display: "flex",
        }}
      >
        {clip.data.Tags.map((tag, i) => (
          <div key={i} className="tag">
            <p>{tag}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -23,
          right: 0,
          display: "flex",
          backgroundColor: "#DC1A21",
          borderRadius: 50,
          gap: ".5rem",
        }}
      >
        {[...Array(2)].map((item, i) => (
          <div
            key={i}
            style={{
              borderRadius: "50px",
              padding: 10,
              lineHeight: 0,
              fontSize: "1.6rem",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-share clipBtn"></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clip;
