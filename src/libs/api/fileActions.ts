import { fileProps } from "../constants/types";

export const addFile = async (file: fileProps) => {
  console.log("Do add file stuff");
  console.log(file);
};

export const deleteFile = async (file: fileProps) => {
  console.log("Do delete file stuff");
  console.log(file);
};

export const editFile = async (newName: string, id: string) => {
  console.log("Do edit file stuff");
  console.log(`${id} -> ${newName}`);
};
