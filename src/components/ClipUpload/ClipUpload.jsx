import React, { useState } from "react";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ClipUpload = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({ title: "" });

  const tagOptions = ["Funny", "Epic", "Nice"];
  const catOptions = ["CS:GO", "GTA", "People"];

  const handleFormChange = (key, value) => {
    const newFormData = {
      ...formData,
      [key]: value,
    };
    setFormData(newFormData);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const uploadVideo = async (file) => {
    const videoRef = ref(storage, `clips/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(videoRef, file);
    return getDownloadURL(videoRef);
  };

  const uploadClip = async (clip) => {
    try {
      const docRef = await addDoc(collection(db, "clips"), clip);
      console.log("Note uploaded with ID:", docRef.id);
    } catch (error) {
      console.error("Error uploading note:", error);
    }
  };

  const handleUploadClip = async () => {
    if (videoFile) {
      const videoURL = await uploadVideo(videoFile);
      const clipData = {
        Owner: auth.currentUser.uid,
        Title: "Test Clip",
        Video: videoURL,
        Tags: selectedTags,
        Categories: selectedCats,
        timeCreated: new Date(),
      };

      uploadClip(clipData);
    } else {
      console.log("No video file selected.");
    }
  };

  const handleTagChange = (event) => {
    const value = event.target.value;
    setSelectedTags((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value)
        : [...prevSelectedOptions, value]
    );
  };
  const handleCatChange = (event) => {
    const value = event.target.value;
    setSelectedCats((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value)
        : [...prevSelectedOptions, value]
    );
  };

  return (
    <>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleFormChange("title", e.target.value)}
      />
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          border: "1px solid white",
          margin: 20,
          gap: "1rem",
        }}
      >
        {tagOptions.map((option) => (
          <>
            <label>
              <input
                type="checkbox"
                value={option}
                onChange={handleTagChange}
                checked={selectedTags.includes(option)}
              />
              {option}
            </label>
          </>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          border: "1px solid white",
          margin: 20,
          gap: "1rem",
        }}
      >
        {catOptions.map((option) => (
          <>
            <label>
              <input
                type="checkbox"
                value={option}
                onChange={handleCatChange}
                checked={selectedCats.includes(option)}
              />
              {option}
            </label>
          </>
        ))}
      </div>
      <p>Selected options: {selectedTags.join(", ")}</p>
      <button onClick={handleUploadClip}>UPLOAD CLIP</button>
    </>
  );
};

export default ClipUpload;
