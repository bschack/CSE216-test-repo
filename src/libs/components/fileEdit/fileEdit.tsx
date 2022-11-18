import { useState } from "react";
import { editUploadProps } from "./fileEdit.types";

import styles from "./fileEdit.module.scss";

export const FileEdit = ({ name, closeModal }: editUploadProps) => {
  const [fileName, setFileName] = useState<string>(name);

  const handleSubmit = () => {
    if (fileName.length < 4) return;
    closeModal();
  };

  const handleDelete = () => {
    closeModal();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFileName(e.target.value);
  };

  return (
    <form className={styles["file-edit"]}>
      <h4 className={styles["file-edit__title"]}>Edit File</h4>
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
