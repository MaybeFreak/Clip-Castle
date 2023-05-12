import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ClipUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({ title: "" });
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCatergories();
  }, []);

  const fetchCatergories = async () => {
    const q = doc(db, "clips", "categories");
    const snap = (await getDoc(q)).data();
    setCategories(snap.categories);
  };

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

  return (
    <>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleFormChange("title", e.target.value)}
      />
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {categories ? (
        <select name="categories" id="categories" defaultValue={"Other"}>
          <option value="" disabled>
            ---Choose Category---
          </option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleUploadClip}>UPLOAD CLIP</button>
    </>
  );
};

export default ClipUpload;
