import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ClipUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({ title: "", tags: [] });
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

  const AddTag = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    const newFormData = { ...formData };
    if (!newFormData.tags.includes(value)) {
      newFormData.tags.push(value);
      setFormData(newFormData);
    }
    e.value = "";
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

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    // const videoURL = await uploadVideo(videoFile);
    // const clipData = {
    //   Owner: auth.currentUser.uid,
    //   Title: formData.title,
    //   Video: videoURL,
    //   // Tags: selectedTags,
    //   Categories: formData.category,
    //   timeCreated: new Date(),
    // };

    // uploadClip(clipData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleFormChange("title", e.target.value)}
        required
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        required
      />
      {categories ? (
        <select
          name="categories"
          onChange={(e) => handleFormChange("category", e.target.value)}
          required
        >
          <option value="">---Choose Category---</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading...</p>
      )}
      <ul>
        {formData.tags.map((tag, i) => (
          <li key={i}>#{tag}</li>
        ))}
      </ul>
      <input
        placeholder="#"
        onKeyDown={(e) => {
          e.key === "Enter" && AddTag(e);
        }}
      ></input>
      <button>UPLOAD CLIP</button>
    </form>
  );
};

export default ClipUpload;
