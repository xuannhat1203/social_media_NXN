import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../SCSS/modal.scss";
import { addStory } from "../store/reducers/post";
import { getUsers } from "../store/reducers/getUser";

const ModalStory = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
  const [file, setFile] = useState<any[]>([]);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const listUser = useSelector((state: any) => state.user.user);

  const handleUpload = async () => {
    const find = listUser.find((user: any) => user.email === email);
    if (!find) {
      console.error("User not found");
      return;
    }
    const newStory = {
      userName: find.userName,
      storyImage: file[0]?.name,
      comment: [],
    };
    console.log("New Story:", newStory);

    dispatch(addStory(newStory));
    onClose();
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(Array.from(files));
    }
  };

  useEffect(() => {
    const find = localStorage.getItem("email");
    if (find) {
      setEmail(JSON.parse(find));
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="story-upload-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Upload Story</h2>
        <input type="file" onChange={handleChangeImage} />
        <textarea
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default ModalStory;
