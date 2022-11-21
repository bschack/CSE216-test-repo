import { useState } from "react";
import { editUploadProps } from "./fileEdit.types";
import { ref, deleteObject } from "firebase/storage";
import { deleteFile, editFile } from "../../api/fileActions";

import storage from "../../../config/firebaseConfig";
import styles from "./fileEdit.module.scss";

export const FileEdit = ({ file, closeModal }: editUploadProps) => {
  const { id, name } = file;

  const [fileName, setFileName] = useState<string>(name);

  const handleSubmit = async () => {
    const trimmed = fileName.trim();
    if (trimmed.length < 4) return;
    if (name === trimmed) {
      closeModal();
      return;
    }
    await editFile(trimmed, id).then(() => closeModal());
  };

  const handleDelete = () => {
    const storageRef = ref(storage, `files/${id}`);

    deleteObject(storageRef)
      .then(async () => {
        await deleteFile(file).then(() => closeModal());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFileName(e.target.value);
  };

  return (
    <form className={styles["file-edit"]}>
      <label className={styles["file-edit__file-name-container"]}>
        <input
          type="text"
          maxLength={64}
          value={fileName}
          onChange={handleChange}
          className={styles["file-edit__file-name"]}
          placeholder="Satisfying Cable Management"
        />
      </label>
      <div className={styles["file-edit__button-group"]}>
        <div
          onClick={handleDelete}
          className={styles["file-edit__button-delete"]}
        >
          Delete
        </div>
        <div
          onClick={handleSubmit}
          className={styles["file-edit__button-submit"]}
        >
          Submit
        </div>
      </div>
    </form>
  );
};
