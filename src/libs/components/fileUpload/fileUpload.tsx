import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { fileUploadProps } from "./fileUpload.types";

import styles from "./fileUpload.module.scss";
import clsx from "clsx";
import { fileProps } from "../../constants/types";

export const FileUpload = ({ closeModal, postId }: fileUploadProps) => {
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [chosen, setChosen] = useState<boolean>(false);

  const handleSubmit = () => {
    if (
      !chosen ||
      typeof base64 !== "string" ||
      base64 === null ||
      fileName.length < 4
    )
      return;
    const file: fileProps = {
      postId: postId,
      name: fileName,
      base64: base64
    };
    console.log(file);
    console.log(base64);
    closeModal();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setFileName(e.target.value);
  };

  const changeName = () => {
    const input = document.getElementById("postFileUpload") as HTMLInputElement;
    if (input.files === null) return;
    const name = input.files[0].name;
    setFileName(name.substring(0, 63));
    encode(input?.files[0]);
    setChosen(true);
  };

  const encode = async (file: File | undefined) => {
    const reader = new FileReader();
    if (file === undefined) return;
    reader.readAsDataURL(file);

    reader.onload = () => {
      setBase64(reader.result);
    };

    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <form className={styles["file-upload"]}>
      <h4 className={styles["file-upload__title"]}>Upload File</h4>
      <label className={styles["file-upload__file-field"]}>
        <input
          type="file"
          id="postFileUpload"
          className={styles["file-upload__file-input"]}
          onInput={changeName}
          multiple={false}
        />
        <div className={styles["file-upload__file-button"]}>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={clsx(chosen ? styles["file-upload__chosen"] : null)}
          />{" "}
          Choose File
        </div>
      </label>
      <label className={styles["file-upload__file-name-container"]}>
        <input
          type="text"
          maxLength={64}
          value={fileName}
          onChange={handleChange}
          disabled={!chosen}
          className={styles["file-upload__file-name"]}
          placeholder="Satisfying Cable Management"
        />
      </label>
      <div
        onClick={handleSubmit}
        className={styles["file-upload__file-submit"]}
      >
        Submit
      </div>
    </form>
  );
};
