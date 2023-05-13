import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase.js";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ClipUpload.css";

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
    e.target.value = "";
  };

  const removeTag = (tag) => {
    console.log("test");
    const newFormData = { ...formData };
    const filterdTags = formData.tags.filter((e) => e !== tag);
    newFormData.tags = filterdTags;
    setFormData(newFormData);
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
    //   // Tags: formData.tags,
    //   Categories: formData.category,
    //   timeCreated: new Date(),
    // };

    // uploadClip(clipData);
  };

  //TODO: https://www.codemzy.com/blog/react-drag-drop-file-upload

  return (
    <main className="Upload">
      <div className="UploadCard">
        <form onSubmit={handleSubmit}>
          {videoFile && <video controls src={URL.createObjectURL(videoFile)} />}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
          <div className="uploadInfo">
            <div>
              <label htmlFor="title">Title</label>
              <input
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="categories">Category</label>
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
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <ul className="tags">
                {formData.tags.map((tag, i) => (
                  <li key={i} className="tag">
                    <p>#{tag}</p>
                    <button type="button" onClick={(e) => removeTag(tag)}>
                      x
                    </button>
                  </li>
                ))}
              </ul>
              <input
                placeholder="#Tags"
                name="tags"
                onKeyDown={(e) => {
                  e.key === "Enter" && AddTag(e);
                }}
              />
            </div>
          </div>
          <button type="submit">UPLOAD CLIP</button>
        </form>
      </div>
    </main>
  );
};

export default ClipUpload;
